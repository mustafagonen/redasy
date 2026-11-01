"""Crop design screenshots into site assets."""
from PIL import Image, ImageDraw, ImageFont
import os

ROOT = r"c:\Users\PcX\Desktop\websitesi"
SRC = os.path.join(ROOT, "anasayfa")
OUT = os.path.join(ROOT, "public", "images")
os.makedirs(OUT, exist_ok=True)

FILES = {
    "home": os.path.join(SRC, "anasayfa1.jpg"),
    "home2": os.path.join(SRC, "anasayfa 2.jpg"),
    "crush": os.path.join(SRC, "kırma eleme", "kırma eleme 2.jpg"),
    "parts": os.path.join(SRC, "kırma eleme", "yedekparça", "Gemini_Generated_Image_o4l6f5o4l6f5o4l6.jpg"),
    "mc": os.path.join(SRC, "kırma eleme", "makine", "Gemini_Generated_Image_wqp75ywqp75ywqp7.jpg"),
    "jaw": os.path.join(SRC, "kırma eleme", "yedekparça", "alt parça", "Gemini_Generated_Image_984b6y984b6y984b.jpg"),
    "att": os.path.join(SRC, "iş makinesi ataşmanları", "Gemini_Generated_Image_ozlu1eozlu1eozlu.jpg"),
    "bucket": os.path.join(SRC, "iş makinesi ataşmanları", "iç sayfa makine", "Gemini_Generated_Image_ewjn1xewjn1xewjn.jpg"),
    "truck": os.path.join(SRC, "araç üstü ekipman", "Gemini_Generated_Image_gs6xl9gs6xl9gs6x.jpg"),
    "frigo": os.path.join(SRC, "araç üstü ekipman", "makine", "Gemini_Generated_Image_ch32mach32mach32.jpg"),
    "mob": os.path.join(SRC, "mobil çözümler", "Gemini_Generated_Image_vjd1wgvjd1wgvjd1.jpg"),
    "blood": os.path.join(SRC, "mobil çözümler", "makine", "Gemini_Generated_Image_mlac81mlac81mlac.jpg"),
}

cache = {}


def im(key):
    if key not in cache:
        cache[key] = Image.open(FILES[key]).convert("RGB")
    return cache[key]


def save(image, rel, maxw=1600):
    path = os.path.join(OUT, rel.replace("/", os.sep))
    os.makedirs(os.path.dirname(path), exist_ok=True)
    img = image
    if img.width > maxw:
        h = int(img.height * maxw / img.width)
        img = img.resize((maxw, h), Image.Resampling.LANCZOS)
    img.save(path, quality=86, optimize=True)
    print("saved", rel, img.size)


def gradient_hero(image, box):
    crop = image.crop(box)
    w, h = crop.size
    grad = Image.new("L", (w, 1))
    for x in range(w):
        t = x / w
        if t < 0.7:
            a = int(242 * (1 - t / 0.7) ** 0.85)
        else:
            a = 0
        grad.putpixel((x, 0), a)
    mask = grad.resize((w, h))
    dark = Image.new("RGB", (w, h), (25, 30, 36))
    return Image.composite(dark, crop, mask)


def right_photo(image, box, ratio=0.48, pad=10):
    x0, y0, x1, y1 = box
    w = x1 - x0
    px = x0 + int(w * (1 - ratio))
    return image.crop((px + pad, y0 + pad, x1 - pad, y1 - pad))


def main():
    home = im("home")
    save(gradient_hero(home, (0, 108, 2752, 1040)), "hero/slide-atasman.jpg", 2000)
    save(gradient_hero(im("truck"), (0, 100, 2752, 560)), "hero/slide-arac.jpg", 2000)
    save(gradient_hero(im("mob"), (0, 100, 2752, 620)), "hero/slide-mobil.jpg", 2000)
    save(gradient_hero(im("crush"), (0, 100, 2752, 640)), "hero/slide-kirma.jpg", 2000)

    save(im("crush").crop((1320, 150, 2720, 560)), "hero/kirma.jpg", 1400)
    save(im("att").crop((1280, 140, 2720, 560)), "hero/atasman.jpg", 1400)
    save(im("truck").crop((1200, 120, 2720, 500)), "hero/arac.jpg", 1400)
    save(im("mob").crop((1480, 150, 2720, 560)), "hero/mobil.jpg", 1400)
    save(im("parts").crop((1280, 120, 2720, 480)), "hero/yedek.jpg", 1400)

    # Homepage sector cards (photo side)
    cards = [
        ("cards/kirma.jpg", (400, 1060, 715, 1465)),
        ("cards/atasman.jpg", (1040, 1060, 1355, 1465)),
        ("cards/arac.jpg", (1680, 1060, 1995, 1465)),
        ("cards/mobil.jpg", (2320, 1060, 2635, 1465)),
    ]
    for rel, box in cards:
        save(home.crop(box), rel, 900)

    save(im("home2").crop((1480, 300, 2700, 980)), "map.jpg", 1200)

    # Crushing machines 2 x 2
    crush = im("crush")
    crush_boxes = {
        "mobil-kirma-eleme": (90, 790, 1330, 1120),
        "mobil-kirma-yuksek": (90, 1145, 1330, 1475),
        "mobil-eleme-yikama": (1420, 790, 2660, 1120),
        "konveyor-bunker": (1420, 1145, 2660, 1475),
    }
    for slug, box in crush_boxes.items():
        save(right_photo(crush, box, 0.5), f"products/{slug}.jpg", 900)

    # Spare parts 3 x 3
    parts = im("parts")
    part_slugs = [
        "bant-konveyor-parcalari",
        "dmk-parcalari",
        "titresimli-elek-parcalari",
        "tersiyer-kirici-parcalari",
        "ceneli-kirici-parcalari",
        "dik-milli-parcalari",
        "sekonder-darbeli-parcalari",
        "cekicli-kirici-parcalari",
        "helezon-yikayici-parcalari",
    ]
    xs = [70, 960, 1850]
    ys = [510, 880, 1250]
    pw, ph = 820, 340
    i = 0
    for y in ys:
        for x in xs:
            save(right_photo(parts, (x, y, x + pw, y + ph), 0.46), f"products/{part_slugs[i]}.jpg", 800)
            i += 1

    # Attachments 4 x 2
    att = im("att")
    att_slugs = [
        "agir-hizmet-kova",
        "elek-kova",
        "grable",
        "izgara-elek-kova",
        "makas",
        "loader-kovasi",
        "quick-coupler",
        "riper",
    ]
    xs = [55, 735, 1415, 2095]
    ys = [690, 1045]
    pw, ph = 640, 330
    i = 0
    for y in ys:
        for x in xs:
            save(right_photo(att, (x, y, x + pw, y + ph), 0.48), f"products/{att_slugs[i]}.jpg", 800)
            i += 1

    # Trucks 3 x 3
    truck = im("truck")
    truck_slugs = [
        "frigo-kasa",
        "vidanjor",
        "tanker",
        "silobas",
        "cop-kasasi",
        "itfaiye",
        "arac-ustu-vinc",
        "hooklift",
        "kurtarici",
    ]
    spans = [(112, 934), (958, 1794), (1820, 2640)]
    ys = [690, 1005, 1320]
    ph = 290
    i = 0
    for y in ys:
        for x0, x1 in spans:
            save(right_photo(truck, (x0, y, x1, y + ph), 0.5), f"products/{truck_slugs[i]}.jpg", 800)
            i += 1

    # Mobile 3 x 2
    mob = im("mob")
    mob_slugs = [
        "mobil-dis-klinigi",
        "mobil-mammografi",
        "mobil-kan-bagisi",
        "mobil-klinik",
        "mobil-mutfak",
        "mobil-afet",
    ]
    ys = [640, 990]
    ph = 320
    i = 0
    for y in ys:
        for x0, x1 in spans:
            save(right_photo(mob, (x0, y, x1, y + ph), 0.52), f"products/{mob_slugs[i]}.jpg", 900)
            i += 1

    # Large detail photos (inset to drop carousel chrome)
    details = {
        "mobil-kirma-eleme": im("mc").crop((300, 500, 1280, 1000)),
        "ceneli-kirici-parcalari": im("jaw").crop((280, 480, 1320, 1020)),
        "agir-hizmet-kova": im("bucket").crop((280, 470, 1320, 1020)),
        "frigo-kasa": im("frigo").crop((260, 460, 1340, 1040)),
        "mobil-kan-bagisi": im("blood").crop((240, 460, 1360, 1060)),
    }
    for slug, crop in details.items():
        save(crop, f"products/{slug}-hero.jpg", 1400)

    # Contact sheet for QA
    names = []
    for dirpath, _, files in os.walk(os.path.join(OUT, "products")):
        for f in files:
            names.append(os.path.join(dirpath, f))
    names.sort()
    thumb = 180
    cols = 6
    rows = (len(names) + cols - 1) // cols
    sheet = Image.new("RGB", (cols * thumb, rows * (thumb + 18)), (20, 20, 20))
    draw = ImageDraw.Draw(sheet)
    for i, path in enumerate(names):
        pic = Image.open(path)
        pic.thumbnail((thumb - 8, thumb - 8))
        x = (i % cols) * thumb + 4
        y = (i // cols) * (thumb + 18) + 4
        sheet.paste(pic, (x, y))
        draw.text((x, y + thumb - 10), os.path.basename(path)[:28], fill=(255, 180, 80))
    sheet.save(os.path.join(ROOT, "_preview", "montage.jpg"), quality=80)
    print("montage", len(names))


if __name__ == "__main__":
    main()
