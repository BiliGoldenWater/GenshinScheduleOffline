from os import listdir

from PIL import Image

Image.MAX_IMAGE_PIXELS = None

col = 4

image_file_names = [f for f in listdir() if f.endswith(".png")]
images = [Image.open(f) for f in sorted(image_file_names, key=lambda s: int(s.removesuffix(".png")))]
row = len(images) // col

size = images[0].size[0]
# noinspection PyTypeChecker
merged = Image.new(images[0].mode, (size * col, size * row))

count = 1
for r in range(0, row):
    for c in range(0, col):
        i = (r * col) + c
        print("processing " + str(i))
        merged.paste(images[i], (c * size, r * size))

break_all = False

print("detecting left_top corner")
left_top = (0, 0)
for x in range(0, merged.size[0]):
    for y in range(0, merged.size[1]):
        if merged.getpixel((x, y)) != (0, 0, 0, 0):
            left_top = (x, y)
            break_all = True
            break
    if break_all:
        break

break_all = False

print("detecting right_bottom corner")
right_bottom = (0, 0)
for x in range(merged.size[0] - 1, -1, -1):
    for y in range(merged.size[1] - 1, -1, -1):
        if merged.getpixel((x, y)) != (0, 0, 0, 0):
            right_bottom = (x, y)
            break_all = True
            break
    if break_all:
        break

print("cropping")
result = merged.crop((left_top[0], left_top[1], right_bottom[0], right_bottom[1]))

print("saving")
result.save("map.webp", method=6, quality=100)
