const boardColumns = [1, 16, 31, 46, 61].map((first) =>
  Array.from({ length: 15 }, (_, i) => i + first)
);

const boardImgLinks = {
  "5 Around The Corner": "https://images2.imgbox.com/99/c7/lJNbg7nb_o.png",
  "Any Chevron": "https://images2.imgbox.com/e0/dc/S28ZWJI2_o.png",
  "Any Diagonal": "https://images2.imgbox.com/72/ee/KjChPwvv_o.png",
  "Any Horizontal Line": "https://images2.imgbox.com/62/79/XBGsPO2n_o.png",
  "Any Pyramid": "https://images2.imgbox.com/8d/66/rhly2vgQ_o.png",
  "Any Three Lines": "https://images2.imgbox.com/7d/14/AyyfFZwD_o.png",
  "Any Vertical Line": "https://images2.imgbox.com/b3/e4/Zl7JQAkv_o.png",
  "Block of 4 Anywhere": "https://images2.imgbox.com/40/63/mHSG5cUY_o.png",
  "Corner Stamp": "https://images2.imgbox.com/13/99/9az9G8Cd_o.png",
  "Giant Kite": "https://images2.imgbox.com/0a/01/LNdaWDLx_o.png",
  "Letter E": "https://images2.imgbox.com/74/42/yWrLGDHr_o.png",
  "Letter X": "https://images2.imgbox.com/df/91/T1iRdCYD_o.png",
  "Photo Frame": "https://images2.imgbox.com/ad/cd/3gPNEkyZ_o.png",
  "Rail Roads": "https://images2.imgbox.com/79/69/QUVTdtju_o.png",
  "Six Pack": "https://images2.imgbox.com/dd/af/IXlgqejm_o.png",
  "Small Kite": "https://images2.imgbox.com/4f/0b/DSuZSkGX_o.png",
};

module.exports = { boardColumns, boardImgLinks };
