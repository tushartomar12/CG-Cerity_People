"""Rasterize PDFs in scripts/out. Fill = share of horizontal bands that contain ink."""
from __future__ import annotations

import json
import sys
from pathlib import Path

try:
    import pypdfium2 as pdfium
except ImportError:
    import subprocess

    subprocess.check_call([sys.executable, "-m", "pip", "install", "pypdfium2", "pillow", "-q"])
    import pypdfium2 as pdfium

from PIL import Image

OUT = Path(__file__).resolve().parent / "out"
SCALE = 2
BANDS = 40
SECTIONS = {
    1: "Cover",
    2: "How to read / TOC",
    3: "Executive summary",
    4: "Overall performance",
    5: "Deep-dive hiring + onboarding",
    6: "Deep-dive attendance + payroll",
    7: "Gap analysis",
    8: "Indicative impact",
    9: "How Cerity People solves this",
    10: "Roadmap + next step",
    11: "Appendix",
}


def fill_percent(img: Image.Image) -> float:
    rgb = img.convert("RGB")
    w, h = rgb.size
    top = int(h * 0.07)
    bottom = int(h * 0.93)
    left = int(w * 0.06)
    right = int(w * 0.94)
    crop = rgb.crop((left, top, right, bottom))
    cw, ch = crop.size
    band_h = max(1, ch // BANDS)
    occupied = 0
    px = crop.load()
    for b in range(BANDS):
        y0 = b * band_h
        y1 = ch if b == BANDS - 1 else y0 + band_h
        ink = 0
        total = 0
        for y in range(y0, y1):
            for x in range(cw):
                r, g, bl = px[x, y]
                total += 1
                if r < 248 or g < 248 or bl < 248:
                    ink += 1
        if total and ink / total >= 0.015:
            occupied += 1
    return round(100.0 * occupied / BANDS, 1)


def main() -> None:
    files = sorted(OUT.glob("*.pdf"))
    if not files:
        raise SystemExit("No PDFs in scripts/out")
    rows = []
    for pdf_path in files:
        doc = pdfium.PdfDocument(str(pdf_path))
        img_dir = OUT / pdf_path.stem
        img_dir.mkdir(exist_ok=True)
        for i, page in enumerate(doc):
            bitmap = page.render(scale=SCALE)
            pil = bitmap.to_pil()
            png = img_dir / f"page-{i + 1:02d}.png"
            pil.save(png)
            fill = fill_percent(pil)
            cover = i == 0
            status = "OK" if (cover or fill >= 50) else "FAIL"
            section = SECTIONS.get(i + 1, f"Page {i + 1}")
            rows.append(
                {"pdf": pdf_path.name, "page": i + 1, "section": section, "fill_pct": fill, "status": status}
            )
            print(f"{pdf_path.name}\tpage {i + 1}\t{section}\t{fill}%\t{status}")
    (OUT / "fill-report.json").write_text(json.dumps(rows, indent=2), encoding="utf-8")
    fails = [r for r in rows if r["status"] == "FAIL"]
    if fails:
        print(f"FAILED {len(fails)} pages")
        sys.exit(1)
    print("ALL PAGES PASS")


if __name__ == "__main__":
    main()
