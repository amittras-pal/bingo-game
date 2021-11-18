const boardColumns = [1, 16, 31, 46, 61].map((first) =>
  Array.from({ length: 15 }, (_, i) => i + first)
);

const boardImages = [
  {
    imageName: "5 Around The Corner",
    imageUrl: "/static/images/5-around-the-corner.png",
  },
  { imageName: "Any Chevron", imageUrl: "/static/images/any-chevron.png" },
  { imageName: "Any Diagonal", imageUrl: "/static/images/any-diagonal.png" },
  {
    imageName: "Any Horizontal Line",
    imageUrl: "/static/images/any-horizontal-line.png",
  },
  { imageName: "Any Pyramid", imageUrl: "/static/images/any-pyramid.png" },
  {
    imageName: "Any Three Lines",
    imageUrl: "/static/images/any-three-lines.png",
  },
  {
    imageName: "Any Vertical Line",
    imageUrl: "/static/images/any-vertical-line.png",
  },
  {
    imageName: "Block of 4 Anywhere",
    imageUrl: "/static/images/block-of-4-anywhere.png",
  },
  { imageName: "Corner Stamp", imageUrl: "/static/images/corner-stamp.png" },
  { imageName: "Giant Kite", imageUrl: "/static/images/giant-kite.png" },
  { imageName: "Letter E", imageUrl: "/static/images/letter-e.png" },
  { imageName: "Letter X", imageUrl: "/static/images/letter-x.png" },
  { imageName: "Photo Frame", imageUrl: "/static/images/photo-frame.png" },
  { imageName: "Rail Roads", imageUrl: "/static/images/rail-roads.png" },
  { imageName: "Six Pack", imageUrl: "/static/images/six-pack.png" },
  { imageName: "Small Kite", imageUrl: "/static/images/small-kite.png" },
];

module.exports = { boardColumns, boardImages };
