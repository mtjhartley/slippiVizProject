import { Component, OnChanges, OnInit } from '@angular/core';
import { SmashggService } from './smashgg.service'
import { DomSanitizer } from '@angular/platform-browser';
 
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Slippi Stats Viz';
  setId: string = 'default'
  setIndex: number = 0;
  setData: object = {};
  stockData: object = {};

  // allSets: Array<object> = [
  //   {id: '7713738', url: 'WOXO78vw6nI', name: 'Armada vs. Hungrybox', gameStarts: [30, 132, 321, 575], winner: 'Armada', loser: 'Hungrybox', score: '3-1'},
  //   {id: '7650193', url: 'vQ7c73TBOSA', name: 'Armada vs. Infinite Numbers', gameStarts: [39, 389, 627], winner: 'Armada', loser: 'Infinite Numbers', score: '3-0'},
  //   {id: '7713735', url: 'zbGv0_5vPdc', name: 'Armada vs. Leffen', gameStarts: [136, 365, 493], winner: 'Armada', loser: 'Leffen', score: '3-0'},
  //   {id: '7650197', url: 'jGdihA8pX0w', name: 'Armada vs. Lucky', gameStarts: [91, 322, 554], winner: 'Armada', loser: 'Lucky', score: '3-0'},
  //   {id: '7713747', url: 'TGyr6wjeFs4', name: 'Axe vs. Ice', gameStarts: [90, 254, 461, 603, 758], winner: 'Axe', loser: 'Ice', score: '3-2'},
  //   {id: '7687299', url: 'W5iQFzaD99w', name: 'ChuDat vs. SFAT', gameStarts: [152, 450, 685, 890], winner: 'ChuDat', loser: 'SFAT', score: '3-1'},
  //   {id: '7687298', url: 'ps0rsWiesx8', name: 'HugS vs. Axe', gameStarts: [94, 487, 736, 1023, 1287], winner: 'Axe', loser: 'HugS', score: '3-2'},
  //   {id: '7650198', url: 'dnDll8B1r5c', name: 'Hungrybox vs. Leffen', gameStarts: [71, 231, 463, 757], winner: 'Hungrybox', loser: 'Leffen', score: '3-1'},
  //   {id: '7713733', url: '0GivvbOhqQg', name: 'Hungrybox vs. PewPewU', gameStarts: [58, 283, 558, 899], winner: 'Hungrybox', loser: 'PewPewU', score: '3-1'},
  //   {id: '7650195', url: 'YG5gveWwFK8', name: "Hungrybox vs. S2J", gameStarts: [252, 583, 720, 897], winner: 'Hungrybox', loser: 'S2J', score: '3-1'},
  //   {id: '7713741', url: '8j6-16kWOMU', name: 'Infinite Numbers vs. S2J', gameStarts: [70, 307, 500, 756, 960], winner: 'S2J', loser: 'Infinite Numbers', score: '3-2'},
  //   {id: '7650210', url: 'oCl8iU2Q3hI', name: 'Infinite Numbers vs. Westballz', gameStarts: [170, 384, 680, 878, 1067], winner: 'Infinite Numbers', loser: 'Westballz', score: '3-2'},
  //   {id: '7713751', url: 'U5j2-Wk1ZOE', name: 'Leffen vs. Axe', gameStarts: [31, 252, 435], winner: 'Leffen', loser: 'Axe', score: '3-0'},
  //   {id: '7713753', url: 'mDvEz6r2zMY', name: 'Leffen vs. Hungrybox', gameStarts: [16, 249, 459, 660, 836], winner: 'Hungrybox', loser: 'Leffen', score: '3-2'},
  //   {id: '7650212', url: 'Q1iWee-GstU', name: 'Leffen vs. Infinite Numbers', gameStarts: [202, 453, 687], winner: 'Leffen', loser: 'Infinite Numbers', score: '3-0'},
  //   {id: '7650213', url: '3fRvGxcXOGg', name: 'Lucky vs. PewPewU', gameStarts: [66,209, 453, 662], winner: 'PewPewU', loser: 'Lucky', score: '3-1'},
  //   {id: '7687300', url: 'Jgi5Jq9isbI', name: 'Mango vs. Axe (Missing Data)', gameStarts: [141, 368, 550, 737, ], winner: 'Axe', loser: 'Mango', score: '3-1'},
  //   {id: '7713740', url: 'EJ0MQTc-SEA', name: 'Mango vs. HugS (Missing Data)', gameStarts: [68, 367, 741 ], winner: 'Mango', loser: 'HugS', score: '3-0'},
  //   {id: '7713734', url: 'WS92sI6Ju-k', name: 'Mew2King vs. Axe', gameStarts: [181, 535, 728, 993, 1230], winner: 'Mew2King', loser: 'Axe', score: '3-2'},
  //   {id: '7713736', url: 'JnS_WcIMHsk', name: 'Mew2King vs. HungryBox', gameStarts: [76, 273, 594, 869], winner: 'Hungrybox', loser: 'Mew2King', score: '3-1'},
  //   {id: '7713752', url: 'mTFHQYF1P2M', name: 'Mew2King vs. Leffen', gameStarts: [186, 363, 446, 733], winner: 'Leffen', loser: 'Mew2King', score: '3-1'},
  //   {id: '7713750', url: 'X1dys1qMPPI', name: 'Mew2King vs. Plup', gameStarts: [62, 263, 472, 738, 913], winner: 'Mew2King', loser: 'Plup', score: '3-2'},
  //   {id: '7650196', url: 'Uk_nJAAESEw', name: 'PewPewU vs. Leffen', gameStarts: [53, 240, 382], winner: 'Leffen', loser: 'PewPewU', score: '3-0'},
  //   {id: '7713748', url: 'QxEqcHUOK3Q', name: 'Plup vs. ChuDat', gameStarts: [65, 445, 783, 1159], winner: 'Plup', loser: 'ChuDat', score: '3-1'},
  //   {id: '7713745', url: '4dHMBc7f_fY', name: 'Plup vs. S2J', gameStarts: [138, 340, 584], winner: 'Plup', loser: 'S2J', score: '3-0'},
  //   {id: '7650211', url: 'GSFtCbu71Oc', name: 'S2J vs. PewPewU', gameStarts: [65, 250, 460, 700], winner: 'PewPewU', loser: 'S2J', score: '3-1'},
  //   {id: '7713749', url: 'tF68F_EeFzY', name: 'SFAT vs. Axe', gameStarts: [50, 276, 424, 589, 866], winner: 'Axe', loser: 'SFAT', score: '3-2'},
  //   {id: '7713742', url: 'Seph5KmwQJU', name: 'SFAT vs. Westballz (Missing Data)', gameStarts: [131, 379, 504, 749], winner: 'SFAT', loser: 'Westballz', score: '3-1'},
  //   //yahoo rivalries
  //   {id: '8005021', url: 'sPaLethDzQ4', name: 'Axe vs The Moon', gameStarts: [60, 305, 465, 772], winner: 'Axe', loser: 'The Moon', score: '3-1'},
  //   {id: '8005025', url: 'kF1PzaaTkgc', name: 'Axe vs Mew2King', gameStarts: [65, 312, 510, 708], winner: 'Axe', loser: 'Mew2King', score: '3-1'},
  //   {id: '8005031', url: 'jS_KvVBekUc', name: 'ChuDat vs DruggedFox', gameStarts: [50, 380, 592, 820, 1053], winner: 'Druggedfox', loser: 'ChuDat', score: '3-2'},
  //   {id: '8004994', url: 'sIh1PjK1fUY', name: 'ChuDat vs S2J', gameStarts: [60, 307, 522, 747], winner: 'ChuDat', loser: 'S2J', score: '3-1'},
  //   {id: '8005027', url: 'HpkXlCJ2hcI', name: 'Druggedfox vs S2J', gameStarts: [69, 339, 582, 744], winner: 'Druggedfox', loser: 'S2J', score: '3-1'},
  //   {id: '8004992', url: 'z1q9FoMox8I', name: 'Duck vs Wizzrobe', gameStarts: [72, 306, 650, 858], winner: 'Wizzrobe', loser: 'Duck', score: '3-1'},
  //   {id: '8004987', url: 'C8d9KLVx4Yw', name: 'Hungrybox vs. Lucky', gameStarts: [81, 257, 424, 646], winner: 'Hungrybox', loser: 'Lucky', score: '3-1'},
  //   {id: '8004995', url: 'p5phfPcBCts', name: 'Hungrybox vs Druggedfox', gameStarts: [35, 224, 428], winner: 'Hungrybox', loser: 'Druggedfox', score: '3-0'},
  //   {id: '8004999', url: 'D1K385S13cw', name: 'Hungrybox vs SFAT', gameStarts: [54, 276, 579, 820], winner: 'Hungrybox', loser: 'SFAT', score: '3-1'},
  //   {id: '8005001', url: 'ohWTH-W4GgA', name: 'Hungrybox vs Wizzrobe (Winners Finals)', gameStarts: [50, 296, 645], winner: 'Hungrybox', loser: 'Wizzrobe', score: '3-0'},
  //   {id: '8005002', url: 'RCHVmxWhWi0', name: 'Hungrybox vs Wizzrobe (Grand Finals Set 1)', gameStarts: [62, 390, 605, 896, 1426], winner: 'Wizzrobe', loser: 'Hungrybox', score: '3-2'},
  //   {id: '8005003', url: 'RCHVmxWhWi0', name: 'Hungrybox vs Wizzrobe (Grand Finals Set 2)', gameStarts: [1904, 2140, 2455], winner: 'Hungrybox', loser: 'Wizzrobe', score: '3-0'},
  //   {id: '8005020', url: 'XN5P75TyV7Y', name: 'Lucky vs Westballz', gameStarts: [62, 217, 366, 555], winner: 'Lucky', loser: 'Westballz', score: '3-1'},
  //   {id: '8005028', url: 'IWala1TlfRs', name: 'Mang0 vs Axe', gameStarts: [55, 181, 369, 54], winner: 'Axe', loser: 'Mang0', score: '3-1'},
  //   {id: '8004998', url: 'wv-oGZHxZrE', name: 'Mang0 vs ChuDat', gameStarts: [78, 311, 520, 639, 805], winner: 'ChuDat', loser: 'Mang0', score: '3-2'},
  //   {id: '8005024', url: 'AhEI_L1DvZs', name: 'Mang0 vs Lucky (Missing Data)', gameStarts: [89, 204, 414, 580, 707], winner: 'Mang0', loser: 'Lucky', score: '3-2'},
  //   {id: '8004993', url: 'D2Ep1XGSvqA', name: 'Mang0 vs. PewPewU', gameStarts: [42, 235, 471, 631, 809], winner: 'Mang0', loser: 'PewPewU', score: '3-2'},
  //   {id: '8004991', url: 'ShsafkT6HbY', name: 'Mew2King vs. Shroomed', gameStarts: [81, 243, 481, 708, 935], winner: 'Mew2King', loser: 'Shroomed', score: '3-2'},
  //   {id: '8004997', url: 'dUYxhvjOcQw', name: 'Mew2King vs Wizzrobe', gameStarts: [66, 295, 453], winner: 'Wizzrobe', loser: 'Mew2King', score: '3-0'},
  //   {id: '8005023', url: '4LI8X_pTjDw', name: 'S2J vs PewPewU', gameStarts: [17, 248, 487, 667], winner: 'S2J', loser: 'PewPewU', score: '3-1'}, //unavailable
  //   {id: '8005030', url: '5RJq70F1js0', name: 'SFAT vs Axe', gameStarts: [34, 311, 430, 629], winner: 'SFAT', loser: 'Axe', score: '3-1'},
  //   {id: '8005032', url: 'qstmW4-20aw', name: 'SFAT vs DruggedFox', gameStarts: [48, 309, 536, 761, 1035], winner: 'DruggedFox', loser: 'SFAT', score: '3-2'},
  //   {id: '8004990', url: 'yMJrCbt2oLY', name: 'SFAT vs. The Moon', gameStarts: [59, 242, 430, 724, 866], winner: 'SFAT', loser: 'The Moon', score: '3-2'},
  //   {id: '8005022', url: 'EkMqwozNJyk', name: 'Shroomed vs Duck', gameStarts: [24, 200, 543, 749, 1014], winner: 'Shroomed', loser: 'Duck', score: '3-2'},
  //   {id: '8004989', url: '2NJJ-TNdo8s', name: 'Swedish Delight vs. Lucky', gameStarts: [63, 232, 436, 660, 872], winner: 'Swedish Delight', loser: 'Axe', score: '3-2'},
  //   {id: '8004996', url: 'NX-QHeiOvFE', name: 'Swedish Delight vs SFAT', gameStarts: [82, 267, 510], winner: 'SFAT', loser: 'Swedish Delight', score: '3-0'},
  //   {id: '8005029', url: 'uo65_b3Qmdo', name: 'Swedish Delight vs DruggedFox', gameStarts: [64, 245, 404], winner: 'Druggedfox', loser: 'Swedish Delight', score: '3-0'},
  //   {id: '8005026', url: 'GtVZ31gAv7o', name: 'Swedish Delight vs Shroomed', gameStarts: [54, 297, 545, 833, 997], winner: 'Swedish Delight', loser: 'Shroomed', score: '3-2'},
  //   {id: '8004988', url: 'qdlPWuOyC34', name: 'Westballz vs. Druggedfox', gameStarts: [76, 244, 475, 746, 979], winner: 'Druggedfox', loser: 'Westballz', score: '3-2'},
  //   {id: '8005000', url: 'rvGrpskrnZ0', name: 'Wizzrobe vs ChuDat', gameStarts: [92, 419, 688], winner: 'Wizzrobe', loser: 'ChuDat', score: '3-0'},
  //   {id: '8005033', url: '4NwBj2l4nLY', name: 'Wizzrobe vs Druggedfox', gameStarts: [82, 347, 578], winner: 'Wizzrobe', loser: 'Druggedfox', score: '3-0'},
  // ];

  allSets: Array<object> = [
    {id: '7713738', url: 'WOXO78vw6nI', name: 'Armada vs. Hungrybox', gameStarts: [30, 132, 321, 575], winner: 'Armada', loser: 'Hungrybox', score: '3-1'},
    {id: '7650193', url: 'vQ7c73TBOSA', name: 'Armada vs. Infinite Numbers', gameStarts: [39, 389, 627], winner: 'Armada', loser: 'Infinite Numbers', score: '3-0'},
    {id: '7713735', url: 'zbGv0_5vPdc', name: 'Armada vs. Leffen', gameStarts: [136, 365, 493], winner: 'Armada', loser: 'Leffen', score: '3-0'},
    {id: '7650197', url: 'jGdihA8pX0w', name: 'Armada vs. Lucky', gameStarts: [91, 322, 554], winner: 'Armada', loser: 'Lucky', score: '3-0'},
    {id: '7713747', url: 'TGyr6wjeFs4', name: 'Axe vs. Ice', gameStarts: [90, 254, 461, 603, 758], winner: 'Axe', loser: 'Ice', score: '3-2'},
    {id: '7687298', url: 'ps0rsWiesx8', name: 'Axe vs. HugS', gameStarts: [94, 487, 736, 1023, 1287], winner: 'Axe', loser: 'HugS', score: '3-2'},
    {id: '8005021', url: 'sPaLethDzQ4', name: 'Axe vs The Moon', gameStarts: [60, 305, 465, 772], winner: 'Axe', loser: 'The Moon', score: '3-1'},
    {id: '8005028', url: 'IWala1TlfRs', name: 'Axe vs Mang0', gameStarts: [55, 181, 369, 54], winner: 'Axe', loser: 'Mang0', score: '3-1'},
    {id: '8005025', url: 'kF1PzaaTkgc', name: 'Axe vs Mew2King', gameStarts: [65, 312, 510, 708], winner: 'Axe', loser: 'Mew2King', score: '3-1'},
    {id: '7713749', url: 'tF68F_EeFzY', name: 'Axe vs. SFAT (Summit)', gameStarts: [50, 276, 424, 589, 866], winner: 'Axe', loser: 'SFAT', score: '3-2'},
    {id: '8004994', url: 'sIh1PjK1fUY', name: 'ChuDat vs S2J', gameStarts: [60, 307, 522, 747], winner: 'ChuDat', loser: 'S2J', score: '3-1'},
    {id: '7687299', url: 'W5iQFzaD99w', name: 'ChuDat vs. SFAT', gameStarts: [152, 450, 685, 890], winner: 'ChuDat', loser: 'SFAT', score: '3-1'},
    {id: '8005031', url: 'jS_KvVBekUc', name: 'Druggedfox vs ChuDat', gameStarts: [50, 380, 592, 820, 1053], winner: 'Druggedfox', loser: 'ChuDat', score: '3-2'},
    {id: '8005027', url: 'HpkXlCJ2hcI', name: 'Druggedfox vs S2J', gameStarts: [69, 339, 582, 744], winner: 'Druggedfox', loser: 'S2J', score: '3-1'},
    {id: '8005032', url: 'qstmW4-20aw', name: 'Druggedfox vs SFAT', gameStarts: [48, 309, 536, 761, 1035], winner: 'DruggedFox', loser: 'SFAT', score: '3-2'},
    {id: '8005029', url: 'uo65_b3Qmdo', name: 'DruggedFox vs Swedish Delight', gameStarts: [64, 245, 404], winner: 'Druggedfox', loser: 'Swedish Delight', score: '3-0'},
    {id: '8004988', url: 'qdlPWuOyC34', name: 'Druggedfox vs. Westballz', gameStarts: [76, 244, 475, 746, 979], winner: 'Druggedfox', loser: 'Westballz', score: '3-2'},
    {id: '8004995', url: 'p5phfPcBCts', name: 'Hungrybox vs Druggedfox', gameStarts: [35, 224, 428], winner: 'Hungrybox', loser: 'Druggedfox', score: '3-0'},
    {id: '7650198', url: 'dnDll8B1r5c', name: 'Hungrybox vs. Leffen', gameStarts: [71, 231, 463, 757], winner: 'Hungrybox', loser: 'Leffen', score: '3-1'},
    {id: '8004987', url: 'C8d9KLVx4Yw', name: 'Hungrybox vs. Lucky', gameStarts: [81, 257, 424, 646], winner: 'Hungrybox', loser: 'Lucky', score: '3-1'},
    {id: '7713736', url: 'JnS_WcIMHsk', name: 'Hungrybox vs. Mew2King', gameStarts: [76, 273, 594, 869], winner: 'Hungrybox', loser: 'Mew2King', score: '3-1'},
    {id: '7713733', url: '0GivvbOhqQg', name: 'Hungrybox vs. PewPewU', gameStarts: [58, 283, 558, 899], winner: 'Hungrybox', loser: 'PewPewU', score: '3-1'},
    {id: '7650195', url: 'YG5gveWwFK8', name: "Hungrybox vs. S2J", gameStarts: [252, 583, 720, 897], winner: 'Hungrybox', loser: 'S2J', score: '3-1'},
    {id: '8004999', url: 'D1K385S13cw', name: 'Hungrybox vs SFAT', gameStarts: [54, 276, 579, 820], winner: 'Hungrybox', loser: 'SFAT', score: '3-1'},
    {id: '8005001', url: 'ohWTH-W4GgA', name: 'Hungrybox vs Wizzrobe (Winners Finals)', gameStarts: [50, 296, 645], winner: 'Hungrybox', loser: 'Wizzrobe', score: '3-0'},
    {id: '8005002', url: 'RCHVmxWhWi0', name: 'Hungrybox vs Wizzrobe (Grand Finals Set 1)', gameStarts: [62, 390, 605, 896, 1426], winner: 'Wizzrobe', loser: 'Hungrybox', score: '3-2'},
    {id: '8005003', url: 'RCHVmxWhWi0', name: 'Hungrybox vs Wizzrobe (Grand Finals Set 2)', gameStarts: [1904, 2140, 2455], winner: 'Hungrybox', loser: 'Wizzrobe', score: '3-0'},
    {id: '7650210', url: 'oCl8iU2Q3hI', name: 'Infinite Numbers vs. Westballz', gameStarts: [170, 384, 680, 878, 1067], winner: 'Infinite Numbers', loser: 'Westballz', score: '3-2'},
    {id: '7713751', url: 'U5j2-Wk1ZOE', name: 'Leffen vs. Axe', gameStarts: [31, 252, 435], winner: 'Leffen', loser: 'Axe', score: '3-0'},
    {id: '7713753', url: 'mDvEz6r2zMY', name: 'Leffen vs. Hungrybox', gameStarts: [16, 249, 459, 660, 836], winner: 'Hungrybox', loser: 'Leffen', score: '3-2'},
    {id: '7650212', url: 'Q1iWee-GstU', name: 'Leffen vs. Infinite Numbers', gameStarts: [202, 453, 687], winner: 'Leffen', loser: 'Infinite Numbers', score: '3-0'},
    {id: '7713752', url: 'mTFHQYF1P2M', name: 'Leffen vs. Mew2King', gameStarts: [186, 363, 446, 733], winner: 'Leffen', loser: 'Mew2King', score: '3-1'},
    {id: '7650196', url: 'Uk_nJAAESEw', name: 'Leffen vs. PewPewU', gameStarts: [53, 240, 382], winner: 'Leffen', loser: 'PewPewU', score: '3-0'},
    {id: '8005020', url: 'XN5P75TyV7Y', name: 'Lucky vs Westballz', gameStarts: [62, 217, 366, 555], winner: 'Lucky', loser: 'Westballz', score: '3-1'},
    // {id: '7687300', url: 'Jgi5Jq9isbI', name: 'Mango vs. Axe (Missing Data)', gameStarts: [141, 368, 550, 737, ], winner: 'Axe', loser: 'Mango', score: '3-1'},
    // {id: '7713740', url: 'EJ0MQTc-SEA', name: 'Mango vs. HugS (Missing Data)', gameStarts: [68, 367, 741 ], winner: 'Mango', loser: 'HugS', score: '3-0'},
    {id: '8004998', url: 'wv-oGZHxZrE', name: 'Mang0 vs ChuDat', gameStarts: [78, 311, 520, 639, 805], winner: 'ChuDat', loser: 'Mang0', score: '3-2'},
    {id: '8005024', url: 'AhEI_L1DvZs', name: 'Mang0 vs Lucky (Missing Data)', gameStarts: [89, 204, 414, 580, 707], winner: 'Mang0', loser: 'Lucky', score: '3-2'},
    {id: '8004993', url: 'D2Ep1XGSvqA', name: 'Mang0 vs. PewPewU', gameStarts: [42, 235, 471, 631, 809], winner: 'Mang0', loser: 'PewPewU', score: '3-2'},
    {id: '7713734', url: 'WS92sI6Ju-k', name: 'Mew2King vs. Axe', gameStarts: [181, 535, 728, 993, 1230], winner: 'Mew2King', loser: 'Axe', score: '3-2'},
    {id: '7713750', url: 'X1dys1qMPPI', name: 'Mew2King vs. Plup', gameStarts: [62, 263, 472, 738, 913], winner: 'Mew2King', loser: 'Plup', score: '3-2'},
    {id: '8004991', url: 'ShsafkT6HbY', name: 'Mew2King vs. Shroomed', gameStarts: [81, 243, 481, 708, 935], winner: 'Mew2King', loser: 'Shroomed', score: '3-2'},
    {id: '7650213', url: '3fRvGxcXOGg', name: 'PewPewU vs. Lucky', gameStarts: [66,209, 453, 662], winner: 'PewPewU', loser: 'Lucky', score: '3-1'},
    {id: '7650211', url: 'GSFtCbu71Oc', name: 'PewPewU vs. S2J', gameStarts: [65, 250, 460, 700], winner: 'PewPewU', loser: 'S2J', score: '3-1'},
    {id: '7713748', url: 'QxEqcHUOK3Q', name: 'Plup vs. ChuDat', gameStarts: [65, 445, 783, 1159], winner: 'Plup', loser: 'ChuDat', score: '3-1'},
    {id: '7713745', url: '4dHMBc7f_fY', name: 'Plup vs. S2J', gameStarts: [138, 340, 584], winner: 'Plup', loser: 'S2J', score: '3-0'},
    {id: '7713741', url: '8j6-16kWOMU', name: 'S2J vs. InfiniteNumbers', gameStarts: [70, 307, 500, 756, 960], winner: 'S2J', loser: 'Infinite Numbers', score: '3-2'},
    {id: '8005023', url: '4LI8X_pTjDw', name: 'S2J vs PewPewU', gameStarts: [17, 248, 487, 667], winner: 'S2J', loser: 'PewPewU', score: '3-1'}, //unavailable
    {id: '8005030', url: '5RJq70F1js0', name: 'SFAT vs Axe (Yahoo)', gameStarts: [34, 311, 430, 629], winner: 'SFAT', loser: 'Axe', score: '3-1'},
    {id: '8004996', url: 'NX-QHeiOvFE', name: 'SFAT vs Swedish Delight', gameStarts: [82, 267, 510], winner: 'SFAT', loser: 'Swedish Delight', score: '3-0'},
    {id: '8004990', url: 'yMJrCbt2oLY', name: 'SFAT vs. The Moon', gameStarts: [59, 242, 430, 724, 866], winner: 'SFAT', loser: 'The Moon', score: '3-2'},
    {id: '7713742', url: 'Seph5KmwQJU', name: 'SFAT vs. Westballz (Missing Data)', gameStarts: [131, 379, 504, 749], winner: 'SFAT', loser: 'Westballz', score: '3-1'},
    {id: '8005022', url: 'EkMqwozNJyk', name: 'Shroomed vs Duck', gameStarts: [24, 200, 543, 749, 1014], winner: 'Shroomed', loser: 'Duck', score: '3-2'},
    {id: '8004989', url: '2NJJ-TNdo8s', name: 'Swedish Delight vs. Lucky', gameStarts: [63, 232, 436, 660, 872], winner: 'Swedish Delight', loser: 'Axe', score: '3-2'},
    {id: '8005026', url: 'GtVZ31gAv7o', name: 'Swedish Delight vs Shroomed', gameStarts: [54, 297, 545, 833, 997], winner: 'Swedish Delight', loser: 'Shroomed', score: '3-2'},
    {id: '8005000', url: 'rvGrpskrnZ0', name: 'Wizzrobe vs ChuDat', gameStarts: [92, 419, 688], winner: 'Wizzrobe', loser: 'ChuDat', score: '3-0'},
    {id: '8005033', url: '4NwBj2l4nLY', name: 'Wizzrobe vs Druggedfox', gameStarts: [82, 347, 578], winner: 'Wizzrobe', loser: 'Druggedfox', score: '3-0'},
    {id: '8004992', url: 'z1q9FoMox8I', name: 'Wizzrobe vs Duck', gameStarts: [72, 306, 650, 858], winner: 'Wizzrobe', loser: 'Duck', score: '3-1'},
    {id: '8004997', url: 'dUYxhvjOcQw', name: 'Wizzrobe vs Mew2King', gameStarts: [66, 295, 453], winner: 'Wizzrobe', loser: 'Mew2King', score: '3-0'},
  ];

  selectedSet: string = ""
  isDataAvailable = false;
  gameIds = [];
  playerIds = [];

  winner;
  loser;
  score;


  p1sggId;
  p1Tag;
  p1Punishes: Array<object> = [];
  p1Hits = 0;
  p1Damage = 0;
  p1Frames = 0;
  p1Kills = 0;
  p1MaxPunish

  p2sggId;
  p2Tag;
  p2Punishes: Array<object> = [];
  p2Hits = 0;
  p2Damage = 0;
  p2Frames = 0;
  p2Kills = 0;
  p2MaxPunish

  p1combos = [];
  p2combos = [];
  allRegressionTuples: Array<any>= [];
  p1game1combos = [];
  p2game1combos = [];
  p1win: number = 0; // will be changed to positive or negative

  playerTuplesForRegressionWithTimeAndGameId: Array<any>=[];
  globalLineChartData;
  
  game1WinProbabilities;

  url: any

  doughnutChartData: number[]
  doughnutChartLabels: string[] = [this.p1Tag, this.p2Tag]
  doughtnutChartType: string

  barChartLabels: string[] = ['Avg. Openings to Kill', ]
  barChartType:string =  'bar'
  barChartLegend:boolean = true;
  barChartData:any[] = [
    {label: 'Player 1'},
    {label: 'Player 2'},

  ]
  barChartOptions:any = {
    title: {
    fullWidth: false,
    display: true,
    text: "Neutral Advantage",
    position: 'top',
    fontSize: 16,
    fontColor: "black"
  },
  scales: {
      yAxes: [{
        ticks: {
          suggestedMin: 3,
          suggestedMax: 10
        },
      }]
    }
  }
  barChartLabels2: string[] = ['Avg. Damage Per Opening', ]
  barChartType2:string =  'bar'
  barChartLegend2:boolean = true;
  barChartData2:any[] = [
    {label: 'Player 1'},
    {label: 'Player 2'},
  ]
  barChartOptions2:any = {
    title: {
    fullWidth: false,
    display: true,
    text: "Punish Advantage",
    position: 'top',
    fontSize: 16,
    fontColor: "black"
  },
    scales: {
      yAxes: [{
        ticks: {
          suggestedMin: 10,
          suggestedMax: 25
        },
      }]
    }

  }

  lineChartData: Array<any> = [
    {data: [.5,], label: 'Game 1'}
  ]
  lineChartLabels: Array<any> = [0];
  lineChartType:string = 'line';
  lineChartLegend:boolean = true;
  lineChartColors:Array<any> = [
    {
      backgroundColor: 'rgba(0,255,0,0)',
      borderColor: 'rgba(0,255,0,1)',
    }
  ]
  lineChartOptions:any = {
    title: {
      fullWidth: false,
      display: true,
      text: "Win Expectancy",
      position: 'top',
      fontSize: 18,
      fontColor: "black"
    },
    responsive: true,
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true,
          min: 0,
          max: 1
        },
        scaleLabel: {
          display: true,
          labelString: this.p1sggId + '|' + this.p2sggId,
          fontSize: 13,
          fontColor: 'black'
        },
      }],
    xAxes: [{
      scaleLabel: {
        labelString: 'Timestamps',
        display: true,
        fontSize: 13,
        fontColor: 'black'
      },
    }]
    }
  }
  chartClicked(e:any):void {
    // console.log(e);
    // console.log(e['active'][0]['_index']);
    var index = e['active'][0]['_index']
    var timestamps = e['active'][0]['_xScale']['ticks']
    window['player'].seekTo(timestamps[index])
    window['document'].all['player'].scrollIntoView(true)

    // for (var key in e['active'])
    //   {
    //     console.log(key);
    //   }
    // console.log(e['active'][0]['_xScale']['ticks'])

  }



  
  ngOnInit() {
    window['onYouTubeIframeAPIReady'].call(null, this.allSets[this.setIndex]['url'])
    this.changeVideo(this.allSets[this.setIndex]['url'])
    this.getSetData()
  }
  ngOnChanges() {
    this.getSetData()
  }

  videoName:string;
  // video: any = {id: "Uk_nJAAESEw?start=53"}
  baseUrl:string = 'https://www.youtube.com/embed/'
  constructor(
    private _smashggService: SmashggService,
    private sanitizer: DomSanitizer
  ){
    this.url = this.sanitizer.bypassSecurityTrustResourceUrl(this.baseUrl+this.allSets[this.setIndex]['url'])
  }

    win_probability(p1Stock, p1Percent, p2Stock, p2Percent, gameId, frameStart) {
      function stocks_as_float(stock, percent) {
          return stock - Math.min(percent, 130) / 140.0
      }
      var p1Stocks = stocks_as_float(p1Stock, p1Percent)
      var p2Stocks = stocks_as_float(p2Stock, p2Percent)
      var stocksTakenAdvantage = Math.log10(p2Stocks / p1Stocks)
      var percentIntoMatch = 1.0 - (p1Stocks + p2Stocks) / 8.0
      var advantageWeight = -2.734 + 2.638 * percentIntoMatch
      // console.log('****')
      // console.log("p1Stock", p1Stock)
      // console.log("p1Percent", p1Percent)
      // console.log("p2Stock", p2Stock)
      // console.log("p2Percent", p2Percent)
      // console.log(.50 + stocksTakenAdvantage * advantageWeight)
      // console.log('****')
      return [gameId, frameStart, Math.min(Math.max(0.50 + stocksTakenAdvantage * advantageWeight, 0.001), 0.999)]
    }

    createWinProbabilityForAGame(arrayOfPlayerStocksAndPercentAtAtime){
      // console.log('creating the win probability for 1 game')
      // console.log("this is the array im passing in", arrayOfPlayerStocksAndPercentAtAtime)
      var winProbabilities = []
      for (var i = 0; i < arrayOfPlayerStocksAndPercentAtAtime.length; i++) {

        winProbabilities.push(this.win_probability(arrayOfPlayerStocksAndPercentAtAtime[i][0],arrayOfPlayerStocksAndPercentAtAtime[i][1],arrayOfPlayerStocksAndPercentAtAtime[i][2],arrayOfPlayerStocksAndPercentAtAtime[i][3],arrayOfPlayerStocksAndPercentAtAtime[i][4],arrayOfPlayerStocksAndPercentAtAtime[i][5]))
 
      }
      // console.log("winProbabilitiles", winProbabilities)
      return winProbabilities
    }


  playerStocksAndPercentAtTime(gameId) {
      let playerTuples = [] //
      // console.log(typeof(gameId))
      let p1id = this.setData['games'][gameId]['players'][0]['id']
      let p1sggid = this.setData['games'][gameId]['players'][0]['playerId'] //sgg id
      let p1stocksArray = this.setData['games'][gameId]['players'][0]['stocks']
      let p2stocksArray = this.setData['games'][gameId]['players'][1]['stocks']
      let p2id = this.setData['games'][gameId]['players'][1]['id']
      let p1stocks = 4
      let p2stocks = 4
      let p1percent = 0
      let p2percent = 0

      let p1combos = this.setData['games'][gameId]['players'][0]["comboStrings"]
      let p2combos = this.setData['games'][gameId]['players'][1]['comboStrings']

      let allcombos = p1combos.concat(p2combos)
      var descendingFrameStart = allcombos.sort((a, b) => (a.frameStart) - (b.frameStart))

      for (var i = 0; i < descendingFrameStart.length; i++) {
        if (descendingFrameStart[i]['sPlayerId'] == p1id) {
          // console.log(descendingFrameStart[i]['sPlayerId'])
          // console.log(p1id)
          if ((descendingFrameStart[i].percentStart < p2percent)) {
            p2stocks -= 1
            // console.log('decrementing the player2 stock')
          }
          // if (((descendingFrameStart[i].percentStart < p2percent) || descendingFrameStart[i].percentStart == 0) && p2firstStock) {
          //   p2firstStock = false;
          // }
          p2percent = descendingFrameStart[i]['percentEnd']

        }
        if (descendingFrameStart[i]['sPlayerId'] == p2id) {
          if ((descendingFrameStart[i].percentStart < p1percent)) {
            p1stocks -= 1
            // console.log('decrementing the player1 stock')
          }
          // if (((descendingFrameStart[i].percentStart < p1percent) || descendingFrameStart[i].percentStart == 0) && p1firstStock) {
          //   p1firstStock = false;
          // }
          p1percent = descendingFrameStart[i]['percentEnd']
        }
       playerTuples.push([p1stocks, p1percent, p2stocks, p2percent, gameId, descendingFrameStart[i]['frameStart']])
      }


      // console.log('******** end of createRegressionPoints *******')
      return playerTuples      
    }
    

    createRegressionPoints(gameId) {
      let regressionTuples = []
      // console.log(typeof(gameId))
      let p1id = this.setData['games'][gameId]['players'][0]['id']
      let p1sggid = this.setData['games'][gameId]['players'][0]['playerId'] //sgg id
      let p1stocksArray = this.setData['games'][gameId]['players'][0]['stocks']
      let p2stocksArray = this.setData['games'][gameId]['players'][1]['stocks']
      let p2id = this.setData['games'][gameId]['players'][1]['id']
      let p1stocks = 4
      let p2stocks = 4
      let p1percent = 0
      let p2percent = 0
      let p1firstStock = false
      let p2firstStock = false
      let p1win = 0
      // console.log('creating hte regression points now')
      let p1combos = this.setData['games'][gameId]['players'][0]["comboStrings"]
      let p2combos = this.setData['games'][gameId]['players'][1]['comboStrings']
      this.setData['games'][gameId]['players'][0]['stocksRemaining'] == 0 ? p1win = -1 : p1win = 1
      // console.log(typeof(this.setData['games'][gameId]['players'][0]['stocksRemaining']))
      // console.log("p1 win:", p1win)
      // console.log(gameId, "this is the game we are currently on leffen vs plup range from 1394, 1395, 1397, 1399")
      let allcombos = p1combos.concat(p2combos)
      var descendingFrameStart = allcombos.sort((a, b) => (a.frameStart) - (b.frameStart))
      // console.log('all combos in the game, sorted by framestart')
      // console.log(descendingFrameStart)

      for (var i = 0; i < descendingFrameStart.length; i++) {
        if (descendingFrameStart[i]['sPlayerId'] == p1id) {
          if ((descendingFrameStart[i].percentStart < p2percent)) {
            p2stocks -= 1
            // console.log('decrementing the player2 stock')
          }
          p2percent = descendingFrameStart[i]['percentEnd']
        }
        if (descendingFrameStart[i]['sPlayerId'] == p2id) {
          if ((descendingFrameStart[i].percentStart < p1percent)) {
            p1stocks -= 1
            // console.log('decrementing the player1 stock')
          }
          p1percent = descendingFrameStart[i]['percentEnd']
        }
       regressionTuples.push([p1stocks, p2stocks, p1percent, p2percent, p1win])
      }
      // console.log('******** end of createRegressionPoints *******')
      return regressionTuples      
    }

    createPunishObject(gameId, i, j) {
      let punishObj = {};
      punishObj['gameId'] = gameId
      punishObj['damage'] = this.setData['games'][gameId]['players'][i]['punishes'][j]['percentEnd'] - this.setData['games'][gameId]['players'][i]['punishes'][j]['percentStart']
      punishObj['hits'] =  this.setData['games'][gameId]['players'][i]['punishes'][j]['hitCount']
      punishObj['isKill'] = this.setData['games'][gameId]['players'][i]['punishes'][j]['isKill']
      punishObj['time'] = this.setData['games'][gameId]['players'][i]['punishes'][j]['frameEnd'] - this.setData['games'][gameId]['players'][i]['punishes'][j]['frameStart']
      punishObj['frameStart'] = this.setData['games'][gameId]['players'][i]['punishes'][j]['frameStart']
      punishObj['frameEnd'] = this.setData['games'][gameId]['players'][i]['punishes'][j]['frameEnd']
      return punishObj;
    }
    resetGlobals() {
      this.playerIds = [];
      this.gameIds = [];

      this.p1sggId;
      this.p1Tag;
      this.p1Punishes = [];
      this.p1Hits = 0;
      this.p1Damage = 0;
      this.p1Frames = 0;
      this.p1Kills = 0;
      this.p1MaxPunish = 0;

      this.p2sggId;
      this.p2Tag;
      this.p2Punishes = [];
      this.p2Hits = 0;
      this.p2Damage = 0;
      this.p2Frames = 0;
      this.p2Kills = 0;
      this.p2MaxPunish = 0;

      this.globalLineChartData;

      this.allRegressionTuples = [];
      this.playerTuplesForRegressionWithTimeAndGameId = [];

    }

    createLineChartData (playerTuplesForRegressionWithTimeAndGameId) {
      var setChartData = []
      for (let i = 0; i < playerTuplesForRegressionWithTimeAndGameId.length; i++) {
        var chartDataAndLabels = {}
        var gameWinProbabilities = this.createWinProbabilityForAGame(playerTuplesForRegressionWithTimeAndGameId[i])
        var lineChartData = [.5]
        var lineChartLabels = [0]
        for (let j = 0; j < gameWinProbabilities.length; j++) {
          lineChartData.push(gameWinProbabilities[j][2])
          var varIndex = this.gameIds.indexOf(gameWinProbabilities[j][0])
          var gameStart = this.allSets[this.setIndex]['gameStarts'][varIndex]
          // console.log('the game start is', gameStart)
          lineChartLabels.push(Math.floor(gameStart + gameWinProbabilities[j][1]/60))
        }
        // **** push either a 0 or a 1 and like 5 frames past the last frame entered to show the winner or loser
        chartDataAndLabels['data'] = lineChartData
        chartDataAndLabels['labels'] = lineChartLabels

        setChartData.push(chartDataAndLabels)
      }
      return setChartData
    } 

    updateLineChartData(gameId) {
      var gameIndex = this.gameIds.indexOf(gameId) //this will get us the index of the game in our array of gameIds
      //we know this index matches the index of our globalLineChartData array
      //thus we can set the data of our linechart to 
      // console.log('this is the game index', gameIndex)
      // console.log('this is the linechart data', this.lineChartData)
      // console.log('this is what im setting the data to be', this.globalLineChartData[gameIndex]['data'])
      // this.lineChartData = [
      //   {data: this.globalLineChartData[gameIndex]['data'], label: gameId},
      //   ] //update the array
      this.lineChartData[0]['data'] = this.globalLineChartData[gameIndex]['data']
      this.lineChartData[0]['label'] = 'Game' + (gameIndex + 1).toString()
      // this.lineChartData[0]['label'] = gameId //update the labels
      // console.log('these are the labels i am trying to use', this.globalLineChartData[gameIndex]['labels'])
      this.lineChartLabels = this.globalLineChartData[gameIndex]['labels']
      this.lineChartType = 'line'
      // this.lineChartData = this.lineChartData.slice();
      // console.log('this is the linechart data now, after clicking', this.lineChartData)
      this.lineChartOptions = {
        responsive: true,
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true,
              min: 0,
              max: 1
            },
            scaleLabel: {
              display: true,
              labelString: this.p1Tag + " chance of winning",
              fontSize: 13,
              fontColor: 'black'
            },
          }],
        xAxes: [{
          scaleLabel: {
            labelString: 'Timestamps',
            display: true,
            fontSize: 10,
            fontColor: 'black'
          },
        }]
        }
      }
      var colorStrings = ['rgba(0,0,255,1)', 'rgba(255,0,0,1)', 'rgba(0,255,0,1)','rgba(255,215,0,1)', 'rgba(102,51,153, 1)']
      this.lineChartColors = [
        {
          backgroundColor: 'rgba(0,255,0,0)',
          borderColor: colorStrings[gameIndex],
        }
      ]
    }

    seekToTime(time, gameId) {
      // console.log('seeking to', time)
      // console.log('this is the id of the current game', gameId)
      // console.log('this is a list of the game ids for this current set', this.gameIds)
      var varIndex = this.gameIds.indexOf(gameId)
      // console.log(varIndex)
      // console.log('************ THIS IS THE CURRENT VIDEO TIME************')
      // console.log(window['player'].getCurrentTime())
      window['player'].seekTo(0)
      // console.log("THIS IS THE TIME WE ARE TRYING TO SEEK TO ", time/60 + this.allSets[this.setIndex]['gameStarts'][varIndex])
      // console.log("THIS IS NOT WORKIGN ^^ WHY")
      // console.log("THIS IS TIME/60", time/60)
      // console.log(this.allSets[this.setIndex]['gameStarts'][varIndex])
      // console.log("THE INDEX IS UNDEFINED WHY")
      // console.log("THIS IS THE ALLSETS[SET INDEX]")
      // console.log(this.allSets[this.setIndex])
      // console.log("THIS IS THE ALLSETS[SETINDEX]['gameSTARTS']")
      // console.log(this.allSets[this.setIndex]['gameStarts'])
      // console.log("THIS IS allsets[setindex][gamestarts][varindex]")
      // console.log(this.allSets[this.setIndex]['gameStarts'][varIndex])
      window['player'].seekTo(time/60 + this.allSets[this.setIndex]['gameStarts'][varIndex], true)
      window['player'].playVideo();
      // window.scrollTo(0, 0);
      // var element = window['document'].getElementById('player')
      // element.scrollIntoView({behavior: "smooth", block:"start"});
      window['document'].all['player'].scrollIntoView(true)

    }

    changeVideo(videoId){
      if (window['player']) {
        // console.log('in window["player"]')
      window['player'].loadVideoById(videoId);
      window['player'].playVideo();
      window['player'].seekTo(0, true);
      }
      // console.log('after changing the video')
      // console.log(window['player'])
    }

  getSetData() {
    // console.log(this.allSets[this.setIndex]['url'])
    this.changeVideo(this.allSets[this.setIndex]['url'])
    // window['onYouTubeIframeAPIReady'].call(null, this.allSets[this.setIndex]['url'])

    // this.url = this.sanitizer.bypassSecurityTrustResourceUrl(this.baseUrl+this.allSets[this.setIndex]['url'])
    // console.log('getting the set ID', this.allSets[this.setIndex]['id'])
    this._smashggService.retrieveSetData(this.allSets[this.setIndex]['id'])
    .then(data => {
      // console.log("got the data form this swag request on our server!!")
      this.resetGlobals()
      // console.log('logging the data ****', data)
      
      // console.log(typeof(data))
      this.doughnutChartLabels = ['','']
      this.setData = data;
      // console.log("logging our global variable this.setData", this.setData)
      // for (var key in this.setData) {
      //   console.log("this is a key in my dataset", key)
      // }
      // console.log('logging this.setData["summary"]', this.setData['summary'])

      for (var key in this.setData['summary']) {
        // console.log('logging the first key', key)
        this.playerIds.push(key)
      }

      // this.p1sggId = this.playerIds[1]
      // console.log('******** this.playerIds array **********')
      // console.log(this.playerIds)
      // this.p1Tag = this.setData['summary'][this.p1sggId]['gamerTag']
      // this.p2sggId = this.playerIds[0]
      // this.p2Tag = this.setData['summary'][this.p2sggId]['gamerTag']

    

      for (var gameId in this.setData['games']) {
        // this.allRegressionTuples.push(this.createRegressionPoints(gameId))
        this.playerTuplesForRegressionWithTimeAndGameId.push(this.playerStocksAndPercentAtTime(gameId))
        // console.log(gameId)
        this.gameIds.push(gameId)

        this.p1combos.push(this.setData['games'][gameId]['players'][0]["comboStrings"]) //for regression
        this.p2combos.push(this.setData['games'][gameId]['players'][1]['comboStrings'])
        this.playerIds = []
        this.playerIds.push(this.setData['games'][gameId]['players'][0]['playerId'])
        this.playerIds.push(this.setData['games'][gameId]['players'][1]['playerId'])
        this.p1sggId = this.playerIds[0]
        this.p2sggId = this.playerIds[1]

        for (var i = 0; i < this.setData['games'][gameId]['players'].length; i++){ //each players array of punishes in a game
          for (var j = 0; j < this.setData['games'][gameId]['players'][i]['punishes'].length; j++) {

            if (this.setData['games'][gameId]['players'][i]['playerId'] == this.p1sggId) {
              let punishObj = this.createPunishObject(gameId, i, j)
              this.p1Damage += punishObj['damage']
              this.p1Hits += punishObj['hits'] //useless information lol or is it hits / punishes
              if (punishObj['isKill']) {
                this.p1Kills += 1
              }
              this.p1Frames += punishObj['time']
              this.p1Punishes.push(punishObj)
            }
            else {
              // console.log('within the else conditional now!')
              let punishObj = this.createPunishObject(gameId, i, j)
              this.p2Damage += punishObj['damage']
              this.p2Hits += punishObj['hits'] //useless information lol or is it hits / punishes
              if (punishObj['isKill']) {
                this.p2Kills += 1
              }
              this.p2Frames += punishObj['time']
              this.p2Punishes.push(punishObj)
            }
          }
        }
      }
        // this.p1sggId = this.playerIds[1]
        this.p1Tag = this.setData['summary'][this.p1sggId]['gamerTag']
        // this.p2sggId = this.playerIds[0]
        this.p2Tag = this.setData['summary'][this.p2sggId]['gamerTag']
        this.doughnutChartData = [this.p1Punishes.length , this.p2Punishes.length ];
        this.doughnutChartLabels = [this.p1Tag, this.p2Tag]
        // console.log(this.p1Tag, this.p2Tag)
        this.doughtnutChartType = 'doughnut'

        //update barchart data
        var p1OpToKill = this.p1Punishes.length / this.p1Kills
        var p2OpToKill = this.p2Punishes.length / this.p2Kills

        var p1DmgPerPunish = this.p1Damage / this.p1Punishes.length
        var p2DmgPerPunish = this.p2Damage / this.p2Punishes.length
        this.barChartData = [
          {data: [p1OpToKill.toFixed(4)], label: this.p1Tag},
          {data: [p2OpToKill.toFixed(4)], label: this.p2Tag},
        ]
        this.barChartData2 = [
          {data: [p1DmgPerPunish.toFixed(4)], label: this.p1Tag},
          {data: [p2DmgPerPunish.toFixed(4)], label: this.p2Tag},
        ]

        // this.p1combos = [].concat.apply([], this.p1combos); //flattening the array of combo strings!
        // this.p2combos = [].concat.apply([], this.p2combos)
        this.p1MaxPunish = this.p1Punishes[this.p1Punishes.map((o)=>o['damage']).indexOf(Math.max(...this.p1Punishes.map((o)=>o['damage'])))]
        this.p2MaxPunish = this.p2Punishes[this.p2Punishes.map((o)=>o['damage']).indexOf(Math.max(...this.p2Punishes.map((o)=>o['damage'])))]
        this.isDataAvailable = true;
        // console.log('printing all of the regression tuples', this.allRegressionTuples)
        // console.log('printing all of the data that we will be mapping to our graph', this.playerTuplesForRegressionWithTimeAndGameId)
          
        //lineChart generation, let's see if we can dynamically change the game...

        // console.log(this.playerTuplesForRegressionWithTimeAndGameId[0])
        // this.game1WinProbabilities = this.createWinProbabilityForAGame(this.playerTuplesForRegressionWithTimeAndGameId[0])
        // console.log('logging the game 1 win prob', this.game1WinProbabilities)
        // this.lineChartData[0]['data'] = [.5]
        // this.lineChartLabels = [0]
        // console.log(this.setData[this.setIndex])
        // for (let i = 0; i < this.game1WinProbabilities.length; i++) {
        //   this.lineChartData[0]['data'].push(this.game1WinProbabilities[i][2])
        //   var varIndex = this.gameIds.indexOf(this.game1WinProbabilities[i][0]) //this gets me the index of the gameStarts array
        //   var gameStart = this.allSets[this.setIndex]['gameStarts'][varIndex]
        //   console.log('here are teh var index and gamestarts')
        //   console.log(varIndex)
        //   console.log(gameStart + this.game1WinProbabilities[i][1]/60)
        //   this.lineChartLabels.push(Math.floor(gameStart + this.game1WinProbabilities[i][1]/60)) 
        // }
        // console.log("these are the data and the labels lmao")
        // console.log(this.lineChartData)
        // console.log(this.lineChartLabels)

        this.globalLineChartData = this.createLineChartData(this.playerTuplesForRegressionWithTimeAndGameId)

        // console.log('doing the initial update')
        this.updateLineChartData(this.gameIds[0])
        window['document'].all['player'].scrollIntoView(true)

        this.winner = this.allSets[this.setIndex]['winner']
        this.loser = this.allSets[this.setIndex]['loser']
        this.score = this.allSets[this.setIndex]['score']

        console.log("This is the selected set", this.selectedSet);
        // console.log('this is the global linechart data', this.globalLineChartData)
        // this.lineChartData[0]['data'] = this.globalLineChartData[0]['data'] //update the array
        // this.lineChartData[0]['label'] = this.globalLineChartData[0]['labels']
        // this.lineChartLabels = this.globalLineChartData[0]['labels']

        //
        //we should be able to get the current gameId
        //list of regressions for every game -> this.playerTuplesForRegressionWithTimeAndGameId


          //return an array of objects, containing the data and labels
          //on click, we will get an index from this array, and use the array[index] -> object to update our line chart

        
    })
    .catch(err => console.log(err))
    }


  }


