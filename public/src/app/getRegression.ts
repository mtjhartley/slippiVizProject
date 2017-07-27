this.p1game1combos = this.p1combos[0]
        this.p2game1combos = this.p2combos[0]
        this.smallestComboArraylength = Math.min(this.p1game1combos.length, this.p2game1combos.length)
        console.log("the smallest combo array length is ", this.smallestComboArraylength)

        while (this.p1game1combos.length > 0 && this.p2game1combos.length > 0) {
          //check the outcome of the first player in the index of players
          if (this.setData['games'][this.gameIds[0]]['players'][0]["stocksRemaining"] == 0) {
            this.p1win = -1;
          } else {
            this.p1win = 1;
          }


            console.log('logging the first index in my array of combo objects')
            console.log(this.p1game1combos.length)
            console.log(this.p2game1combos.length)
            if (this.p1game1combos[0].frameStart < this.p2game1combos[0].frameStart) {
              console.log('removing player 1s combo')
              console.log("player 1 starting combo frame", this.p1game1combos[0].frameStart)
              console.log("player 2 starting combo frame", this.p2game1combos[0].frameStart)
              let currentCombo = this.p1game1combos.shift()
              if (currentCombo.percentStart == 0 && !this.p1firstStock) {
                this.p2stocks -= 1
              }
              if (currentCombo.percentStart == 0 && this.p2firstStock) {
                this.p2firstStock = false;
              }
              this.p2percent = currentCombo.percentEnd
            }
            else if (this.p1game1combos[0].frameStart > this.p2game1combos[0].frameStart) {
              console.log('removing player 2s combo')
              console.log('player 1 starting combo frame time', this.p1game1combos[0].frameStart)
              console.log("player 2 starting combo frame", this.p2game1combos[0].frameStart)
              let currentCombo = this.p2game1combos.shift()

              if (currentCombo.percentStart == 0 && !this.p1firstStock) {
                this.p1stocks -= 1
              }
              if (currentCombo.percentStart == 0 && this.p1firstStock) {
                this.p1firstStock = false;
              }
              this.p1percent = currentCombo.percentEnd
            }
            if (this.p1game1combos[0] && !this.p2game1combos[0]){
              let currentCombo = this.p1game1combos.shift()
              if (currentCombo.percentStart == 0 && this.p2firstStock) {
                this.p2firstStock = false;
              }
              if (currentCombo.percentStart == 0) {
                this.p2stocks -= 1
              }
              this.p2percent = currentCombo.percentEnd
              
            }
            if (this.p2game1combos[0] && !this.p1game1combos[0]){
              let currentCombo = this.p2game1combos.shift()
              if (currentCombo.percentStart == 0) {
                this.p1stocks -= 1
              }
              this.p1percent = currentCombo.percentEnd
            }

              this.regressionTuples.push([this.p1stocks, this.p1percent, this.p2stocks, this.p2percent, this.p1win])
          }
            console.log(this.p1game1combos)
            console.log(this.p2game1combos)
            console.log('the regression tuples')
            console.log(this.regressionTuples)



            
            // this.regressionTuples.push()


        

        this.isDataAvailable = true;




      //empty p1combos = []; and p2combos =[]; at the end.

      // let smallestComboArraylength = Math.min(p1combos.length, p2combos.length)
      // while (p1combos.length > 0 && p2combos.length > 0) {
      //   console.log("the current lengths for each players comboStrings", p1combos.length, p2combos.length)


      //   if (p1combos.length == 0 && p2combos.length > 0) {
      //     let currentCombo = p2combos.shift()
      //     if (currentCombo.percentStart == 0 && !p2firstStock) {
      //       p2stocks -= 1
      //     }
      //     if (currentCombo.percentStart == 0 && p2firstStock) {
      //       p2firstStock = false;
      //     }
      //     p2percent = currentCombo.percentEnd
      //   }
      //   if (p2combos.length == 0 && p1combos.length > 0) {
      //     let currentCombo = p1combos.shift()
      //     if (currentCombo.percentStart == 0 && !p2firstStock) {
      //       p1stocks -= 1
      //     }
      //     if (currentCombo.percentStart == 0 && p2firstStock) {
      //       p1firstStock = false;
      //     }
      //     p1percent = currentCombo.percentEnd
      //   }
        
      //   //cases when there are still elements left in both arrays
      //   if (p1combos[0].frameStart < p2combos[0].frameStart ) {
      //     console.log("p1 starting frame", p1combos[0].frameStart, "p2 starting frame", p2combos[0].frameStart)
      //     console.log('player 1 combo started first!')
      //     let currentCombo = p1combos.shift()
      //     if (currentCombo.percentStart == 0 && !p2firstStock) {
      //       p2stocks -= 1
      //     }
      //     if (currentCombo.percentStart == 0 && p2firstStock) {
      //       p2firstStock = false;
      //     }
      //     p2percent = currentCombo.percentEnd
      //   }
      //   else if (p1combos[0].frameStart > p2combos[0].frameStart) {
      //     console.log("p1 starting frame", p1combos[0].frameStart, "p2 starting frame", p2combos[0].frameStart)
      //     console.log('player 2 combo started first!')
      //     let currentCombo = p1combos.shift()
      //     if (currentCombo.percentStart == 0 && !p1firstStock) {
      //       p1stocks -= 1
      //     }
      //     if (currentCombo.percentStart == 0 && p1firstStock) {
      //       p1firstStock = false;
      //     }
      //     p1percent = currentCombo.percentEnd
      //   }
      //   else {
      //     let currentCombo1 = p1combos.shift()
      //     let currentCombo2 = p2combos.shift()
      //   }
      //   regressionTuples.push([p1stocks, p2stocks, p1percent, p2percent, p1win])
      // }
      // return regressionTuples

      // let allcombos = p1combos.concat(p2combos)
      
     

      // console.log('logging information about allcombos')
      // console.log("all combos array", allcombos)
      // console.log("allcombos length", allcombos.length)

    

      // this.setData['games'][gameId]['players'][0]['stocksRemaining'] == 0 ? this.p1win = -1 : this.p1win = 1
      //console.log(this.p1win)

      // console.log("the lengths of each players comboStrings for this game", p1combos.length, p2combos.length)
      // var descendingFrameStart = allcombos.sort((a, b) => (b.frameStart) - (a.frameStart))
      // console.log('this should be everything sorted')
      // console.log(descendingFrameStart)
      // console.log('******** end of createRegressionPoints *******')



      //empty p1combos = []; and p2combos =[]; at the end.
