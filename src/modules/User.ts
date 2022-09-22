export class User {
  nickName: string;
  firstGameTimerValue: number;
  secondGameScoreValue: number;
  thirdGameScoreValue: number;
  datePlayed: string;
  id: number;
  constructor(
    nickName: string,
    firstGameTimerValue: number,
    secondGameScoreValue: number,
    thirdGameScoreValue: number,
    datePlayed: string
  ) {
    this.nickName = nickName;
    this.firstGameTimerValue = firstGameTimerValue;
    this.secondGameScoreValue = secondGameScoreValue;
    this.thirdGameScoreValue = thirdGameScoreValue;
    this.datePlayed = datePlayed;
  }
}
