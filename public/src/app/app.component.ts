import { Component, OnChanges } from '@angular/core';
import { SmashggService } from './smashgg.service'
import { DomSanitizer } from '@angular/platform-browser';
 
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Slippi Stats Viz';
  setId: string = 'default'
  setIndex: number = 0;
  setData: object = {};
  stockData: object = {};

  allSets: Array<object> = [
    {id: '7650196', url: 'Uk_nJAAESEw', name: 'PewPewU vs. Leffen', gameStarts: [53, 240, 382]},
    {id: '7650195', url: 'YG5gveWwFK8', name: "Hungrybox vs. S2J", gameStarts: [252, 583, 720, 897]},
    {id: '7650193', url: 'vQ7c73TBOSA', name: 'Armada vs. Infinite Numbers', gameStarts: [39, 389, 627]},
    {id: '7650198', url: 'dnDll8B1r5c', name: 'Hungrybox vs. Leffen', gameStarts: [71, 231, 463, 757]},
    {id: '7650211', url: 'GSFtCbu71Oc', name: 'S2J vs. PewPewU', gameStarts: [65, 250, 460, 700]},
    {id: '7650197', url: 'jGdihA8pX0w', name: 'Armada vs. Lucky', gameStarts: [91, 322, 554]},
    {id: '7650210', url: 'oCl8iU2Q3hI', name: 'Infinite Numbers vs. Westballz', gameStarts: [170, 384, 680, 878, 1067]},
    {id: '7650213', url: '3fRvGxcXOGg', name: 'Lucky vs. PewPewU', gameStarts: [66,209, 453, 662]},
    {id: '7650212', url: 'Q1iWee-GstU', name: 'Leffen vs. Infinite Numbers', gameStarts: [202, 453, 687]},
    {id: '7687298', url: 'ps0rsWiesx8', name: 'HugS vs. Axe', gameStarts: [94, 487, 736, 1023, 1287]},
    //finish the rest later LMAO
  ];

  selectedSet: string = ""


  isDataAvailable = false;
  gameIds = [];
  playerIds = [];

  p1sggId;
  p1Tag;
  p1Punishes: Array<object> = [];
  p1Hits = 0;
  p1Damage = 0;
  p1Frames = 0;
  p1Kills = 0;

  p2sggId;
  p2Tag;
  p2Punishes: Array<object> = [];
  p2Hits = 0;
  p2Damage = 0;
  p2Frames = 0;
  p2Kills = 0;

  p1combos = [];
  p2combos = [];
  allRegressionTuples: Array<any>= [];
  p1game1combos = [];
  p2game1combos = [];
  p1win: number = 0; // will be changed to positive or negative
  
  url: any


  doughnutChartData: number[]
  doughnutChartLabels: string[] = [this.p1Tag, this.p2Tag]
  doughtnutChartType: string

  barChartLabels: string[] = ['Average Openings to Kill', 'Average Damage Per Opening', 'Average Hits Per Combo', ]
  barChartType:string =  'bar'
  barChartLegend:boolean = true;
  barChartData:any[] = [
    {data: [this.p1Punishes.length / this.p1Kills, this.p1Damage / this.p1Punishes.length, this.p1Hits / this.p1Punishes.length], label: 'Player 1'},
    {data: [this.p2Punishes.length / this.p2Kills, this.p2Damage / this.p2Punishes.length, this.p2Hits / this.p2Punishes.length], label: 'Player 2'},

  ]
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
    

    createRegressionPoints(gameId) {
      let regressionTuples = []
      console.log(typeof(gameId))
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

      console.log()

      this.setData['games'][gameId]['players'][0]['stocksRemaining'] == 0 ? p1win = -1 : p1win = 1
      console.log(typeof(this.setData['games'][gameId]['players'][0]['stocksRemaining']))
      console.log("p1 win:", p1win)
      console.log(gameId, "this is the game we are currently on leffen vs plup range from 1394, 1395, 1397, 1399")
      let allcombos = p1combos.concat(p2combos)
      var descendingFrameStart = allcombos.sort((a, b) => (a.frameStart) - (b.frameStart))
      // console.log('all combos in the game, sorted by framestart')
      // console.log(descendingFrameStart)

      for (var i = 0; i < descendingFrameStart.length; i++) {
        if (descendingFrameStart[i]['sPlayerId'] == p1id) {
          // console.log(descendingFrameStart[i]['sPlayerId'])
          // console.log(p1id)
          if ((descendingFrameStart[i].percentStart < p2percent)) {
            p2stocks -= 1
            console.log('decrementing the player2 stock')
          }
          // if (((descendingFrameStart[i].percentStart < p2percent) || descendingFrameStart[i].percentStart == 0) && p2firstStock) {
          //   p2firstStock = false;
          // }
          p2percent = descendingFrameStart[i]['percentEnd']

        }
        if (descendingFrameStart[i]['sPlayerId'] == p2id) {
          if ((descendingFrameStart[i].percentStart < p1percent)) {
            p1stocks -= 1
            console.log('decrementing the player1 stock')
          }
          // if (((descendingFrameStart[i].percentStart < p1percent) || descendingFrameStart[i].percentStart == 0) && p1firstStock) {
          //   p1firstStock = false;
          // }
          p1percent = descendingFrameStart[i]['percentEnd']
        }
       regressionTuples.push([p1stocks, p2stocks, p1percent, p2percent, p1win])
      }


      console.log('******** end of createRegressionPoints *******')
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

      this.p1sggId;
      this.p1Tag;
      this.p1Punishes = [];
      this.p1Hits = 0;
      this.p1Damage = 0;
      this.p1Frames = 0;
      this.p1Kills = 0;


      this.p2sggId;
      this.p2Tag;
      this.p2Punishes = [];
      this.p2Hits = 0;
      this.p2Damage = 0;
      this.p2Frames = 0;
      this.p2Kills = 0;

    }

    seekToTime(time, gameId) {
      console.log('seeking to', time)
      console.log('this is the id of the current game', gameId)
      console.log('this is a list of the game ids for this current set', this.gameIds)
      var varIndex = this.gameIds.indexOf(gameId)
      console.log(varIndex)
      window['player'].seekTo(time/60 + this.allSets[this.setIndex]['gameStarts'][varIndex])
      window['player'].playVideo();
    }

  getSetData() {
    console.log(this.allSets[this.setIndex]['url'])
    window['onYouTubeIframeAPIReady'].call(null, this.allSets[this.setIndex]['url'])
    this.url = this.sanitizer.bypassSecurityTrustResourceUrl(this.baseUrl+this.allSets[this.setIndex]['url'])
    console.log('getting the set ID', this.allSets[this.setIndex]['id'])
    this._smashggService.retrieveSetData(this.allSets[this.setIndex]['id'])
    .then(data => {
      console.log("got the data form this swag request on our server!!")
      this.resetGlobals()
      console.log('logging the data ****', data)
      
      console.log(typeof(data))
      this.doughnutChartLabels = ['','']
      this.setData = data;
      console.log("logging our global variable this.setData", this.setData)
      // for (var key in this.setData) {
      //   console.log("this is a key in my dataset", key)
      // }

      console.log('logging this.setData["summary"]', this.setData['summary'])

      for (var key in this.setData['summary']) {
        console.log('logging the first key', key)
        this.playerIds.push(key)
      }
      this.p1sggId = this.playerIds[1]
      console.log('******** this.playerIds array **********')
      console.log(this.playerIds)
      this.p1Tag = this.setData['summary'][this.p1sggId]['gamerTag']
      this.p2sggId = this.playerIds[0]
      this.p2Tag = this.setData['summary'][this.p2sggId]['gamerTag']

    

      for (var gameId in this.setData['games']) {
        this.allRegressionTuples.push(this.createRegressionPoints(gameId))
        console.log(gameId)
        this.gameIds.push(gameId)

        this.p1combos.push(this.setData['games'][gameId]['players'][0]["comboStrings"]) //for regression
        this.p2combos.push(this.setData['games'][gameId]['players'][1]['comboStrings'])

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
              console.log('within the else conditional now!')
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
        this.doughnutChartData = [this.p1Punishes.length , this.p2Punishes.length ];
        this.doughnutChartLabels = [this.p1Tag, this.p2Tag]
        console.log(this.p1Tag, this.p2Tag)
        this.doughtnutChartType = 'doughnut'
        this.barChartData = [
          {data: [this.p1Punishes.length / this.p1Kills, this.p1Damage / this.p1Punishes.length, this.p1Hits / this.p1Punishes.length], label: this.p1Tag},
          {data: [this.p2Punishes.length / this.p2Kills, this.p2Damage / this.p2Punishes.length, this.p2Hits / this.p2Punishes.length], label: this.p2Tag},
        ]

        // this.p1combos = [].concat.apply([], this.p1combos); //flattening the array of combo strings!
        // this.p2combos = [].concat.apply([], this.p2combos)
        this.isDataAvailable = true;
        console.log('printing all of the regression tuples', this.allRegressionTuples)
    })
    .catch(err => console.log(err))
    }


  }


