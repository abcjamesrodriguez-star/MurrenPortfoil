import requests, json, os, time
from urllib.parse import urlparse

BASE = "https://murren.com.co"
OUT_DIR = os.path.expanduser("~/murren/data")
IMG_DIR = f"{OUT_DIR}/imagenes"
os.makedirs(IMG_DIR, exist_ok=True)

all_products = []
page = 1

print("🔍 Descargando productos...")
while True:
    url = f"{BASE}/products.json?limit=250&page={page}"
    r = requests.get(url, timeout=15)
    products = r.json().get("products", [])
    if not products:
        break
    all_products.extend(products)
    print(f"  Página {page}: {len(products)} productos encontrados")
    page += 1
    time.sleep(0.5)

print(f"\n📦 Total: {len(all_products)} productos. Procesando...\n")

clean = []
for p in all_products:
    item = {
        "id": p["id"],
        "handle": p["handle"],
        "nombre": p["title"],
        "marca": p.get("vendor", "MURREN"),
        "tipo": p.get("product_type", ""),
        "descripcion_html": p.get("body_html", ""),
        "tags": p.get("tags", []),
        "precio_base": p["variants"][0]["price"] if p.get("variants") else None,
        "variantes": [
            {
                "id": v["id"],
                "titulo": v["title"],
                "talla": v.get("option1"),
                "color": v.get("option2"),
                "precio": v.get("price"),
                "compare_at_price": v.get("compare_at_price"),
                "sku": v.get("sku"),
                "disponible": v.get("available", True)
            } for v in p.get("variants", [])
        ],
        "imagenes_url": [img["src"] for img in p.get("images", [])],
        "imagenes_local": []
    }

    # Descargar imágenes
    prod_folder = f"{IMG_DIR}/{p['handle']}"
    os.makedirs(prod_folder, exist_ok=True)
    for i, img in enumerate(p.get("images", [])):
        img_url = img["src"].split("?")[0]  # quita params
        ext = os.path.splitext(urlparse(img_url).path)[1] or ".jpg"
        img_name = f"{i+1}{ext}"
        local_path = f"{prod_folder}/{img_name}"
        try:
            img_data = requests.get(img["src"], timeout=15).content
            with open(local_path, "wb") as f:
                f.write(img_data)
            item["imagenes_local"].append(f"imagenes/{p['handle']}/{img_name}")
            print(f"  ✓ {p['handle']}/{img_name}")
        except Exception as e:
            print(f"  ✗ Error en {img_name}: {e}")
        time.sleep(0.1)

    clean.append(item)

# Guardar JSON
json_path = f"{OUT_DIR}/productos.json"
with open(json_path, "w", encoding="utf-8") as f:
    json.dump(clean, f, ensure_ascii=False, indent=2)

print(f"\n✅ Listo!")
print(f"   📄 JSON → {json_path}")
print(f"   🖼️  Imágenes → {IMG_DIR}")
print(f"   📦 {len(clean)} productos guardados")
