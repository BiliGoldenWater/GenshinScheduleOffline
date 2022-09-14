from os import listdir
from PIL import Image

col = 4

image_file_names = [f for f in listdir() if f.endswith(".png")]
images = [Image.open(f) for f in sorted(image_file_names, key=lambda s: int(s.removesuffix(".png")))]
row = len(images) // col

size = images[0].size[0]
# noinspection PyTypeChecker
result = Image.new(images[0].mode, (size * col, size * row))

count = 1
for r in range(0, row):
    for c in range(0, col):
        i = (r * col) + c
        print("processing " + str(i))
        result.paste(images[i], (c * size, r * size))

result.save("mergeOutput.png")
