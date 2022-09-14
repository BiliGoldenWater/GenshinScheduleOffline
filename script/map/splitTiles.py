from pathlib import Path as path

from PIL import Image

Image.MAX_IMAGE_PIXELS = None

tile_size = 256
scale = 1
min_zoom = 2


def gen_tile(img: Image.Image, left: int, upper: int, width: int, height: int, x_id: int, y_id: int, zoom: int):
    # mkdirs
    p = path(f"tiles/{zoom}")
    if not p.exists():
        p.mkdir()

    (img_w, img_h) = img.size
    (right, lower) = (left + width, upper + height)
    if left > img_w or upper > img_h:
        # noinspection PyTypeChecker
        result = Image.new(img.mode, (width, height))
    elif right > img_w or lower > img_h:
        # noinspection PyTypeChecker
        result = Image.new(img.mode, (width, height))

        result.paste(img.crop((left, upper, min(right, img_w), min(lower, img_h))))
    else:
        result = img.crop((left, upper, right, lower))

    result.resize((tile_size, tile_size)).save(f"tiles/{zoom}/{x_id}_{y_id}.webp")


def gen_tiles(img: Image.Image, base_size: int, zoom: int, max_zoom: int):
    current_size = base_size // (pow(2, zoom))

    tile_num = base_size // current_size
    for x in range(0, tile_num):
        for y in range(0, tile_num):
            print(f"generating zoom: {zoom}, x: {x}, y: {y}")
            gen_tile(img, x * current_size, y * current_size, current_size, current_size, x, y, zoom)
    if zoom < max_zoom:
        gen_tiles(img, base_size, zoom + 1, max_zoom)


if __name__ == "__main__":
    print("loading")
    input_img = Image.open("mergeOutput.png")
    if scale < 1:
        input_img = input_img.resize((input_img.size[0] * scale, input_img.size[1] * scale))

    zoom_0_size = 0
    zoom_num = 0
    for x in range(0, 100):
        size = 256 * pow(2, x)
        if size >= input_img.size[0] and size >= input_img.size[1]:
            zoom_0_size = size
            zoom_num = x
            break

    tiles_path = path("tiles")
    if not tiles_path.exists():
        tiles_path.mkdir()
    gen_tiles(input_img, zoom_0_size, min_zoom, zoom_num)
