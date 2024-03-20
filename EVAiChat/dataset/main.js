import { id3Extract } from `./id3-extract.js`;
import { page1 } from `./page1.js`;
import { page2 } from `./page2.js`;
import { page3 } from `./page3.js`;
import { page4 } from `./page4.js`;
import { pdfExtract } from `./pdfExtract.js`;


export const contextData = id3Extract + page1 + page2 + page3 + page4 + pdfExtract;
