import React from 'react';
import '../CSS/primary.css';
import { Button, Image, Icon, Label, Header, Modal } from 'semantic-ui-react';

var fileDir = [
    { fileName: './50images/n01532829_26.JPEG', id: "n01532829" },
    { fileName: './50images/n01622779_70.JPEG', id: "n01622779" },
    { fileName: './50images/n01667778_35.JPEG', id: "n01667778" },
    { fileName: './50images/n01693334_143.JPEG', id: "n01693334" },
    { fileName: './50images/n01697457_118.JPEG', id: "n01697457" },
    { fileName: './50images/n01734418_109.JPEG', id: "n01734418" },
    { fileName: './50images/n01756291_309.JPEG', id: "n01756291" },
    { fileName: './50images/n01818515_244.JPEG', id: "n01818515" },
    { fileName: './50images/n01871265_89.JPEG', id: "n01871265" },
    { fileName: './50images/n01873310_379.JPEG', id: "n01873310" },
    { fileName: './50images/n02007558_149.JPEG', id: "n02007558" },
    { fileName: './50images/n02051845_11.JPEG', id: "n02051845" },
    { fileName: './50images/n02090721_1717.JPEG', id: "n02090721" },
    { fileName: './50images/n02096051_6775.JPEG', id: "n02096051" },
    { fileName: './50images/n02097298_12041.JPEG', id: "n02097298" },
    { fileName: './50images/n02101388_13498.JPEG', id: "n02101388" },
    { fileName: './50images/n02112137_5955.JPEG', id: "n02112137" },
    { fileName: './50images/n02137549_19.JPEG', id: "n02137549" },
    { fileName: './50images/n02177972_2.JPEG', id: "n02177972" },
    { fileName: './50images/n02206856_132.JPEG', id: "n02206856" },
    { fileName: './50images/n02233338_47.JPEG', id: "n02233338" },
    { fileName: './50images/n02277742_57.JPEG', id: "n02277742" },
    { fileName: './50images/n02342885_33.JPEG', id: "n02342885" },
    { fileName: './50images/n02443114_332.JPEG', id: "n02443114" },
    { fileName: './50images/n02445715_70.JPEG', id: "n02445715" },
    { fileName: './50images/n02692877_313.JPEG', id: "n02692877" },
    { fileName: './50images/n02793495_173.JPEG', id: "n02793495" },
    { fileName: './50images/n02841315_250.JPEG', id: "n02841315" },
    { fileName: './50images/n02906734_75.JPEG', id: "n02906734" },
    { fileName: './50images/n02948072_386.JPEG', id: "n02948072" },
    { fileName: './50images/n02980441_639.JPEG', id: "n02980441" },
    { fileName: './50images/n03047690_361.JPEG', id: "n03047690" },
    { fileName: './50images/n03160309_627.JPEG', id: "n03160309" },
    { fileName: './50images/n03271574_572.JPEG', id: "n03271574" },
    { fileName: './50images/n03297495_93.JPEG', id: "n03297495" },
    { fileName: './50images/n03404251_150.JPEG', id: "n03404251" },
    { fileName: './50images/n03481172_408.JPEG', id: "n03481172" },
    { fileName: './50images/n03594945_211.JPEG', id: "n03594945" },
    { fileName: './50images/n03662601_373.JPEG', id: "n03662601" },
    { fileName: './50images/n03673027_359.JPEG', id: "n03673027" },
    { fileName: './50images/n03729826_226.JPEG', id: "n03729826" },
    { fileName: './50images/n03777568_271.JPEG', id: "n03777568" },
    { fileName: './50images/n03837869_161.JPEG', id: "n03837869" },
    { fileName: './50images/n03930313_1116.JPEG', id: "n03930313" },
    { fileName: './50images/n03954731_9.JPEG', id: "n03954731" },
    { fileName: './50images/n04044716_101.JPEG', id: "n04044716" },
    { fileName: './50images/n04154565_753.JPEG', id: "n04154565" },
    { fileName: './50images/n04285008_296.JPEG', id: "n04285008" },
    { fileName: './50images/n04465501_75.JPEG', id: "n04465501" },
    { fileName: './50images/n04505470_250.JPEG', id: "n04505470" },    
]

var activeIndex = Math.floor(Math.random() * 50), usedImages = [activeIndex], taskDone = 1, flag;
var timeTaken = { minutes: 0, seconds: 0, milsec: 0 }, addTime = [0, 0, 0], avgTime = [], Interval;
var fileName = fileDir[activeIndex].fileName;

export class MainImages extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isopen: false,
            activeNext: false,
            buttonText: "Next Button"
        };
    }

    componentDidMount() {
        alert("* Please disable AdBlock and any other antivirus software before you begin!\n Make sure to \"Allow\" popups/cookies on this app! *");
        this.props.onRef(this)
    }

    updateButton() {
        this.state.activeNext ? this.setState({ activeNext: false }) : this.setState({ activeNext: true })
    }

    OnFinish() {
        //To find the Average time
        let td = taskDone - 1;
        avgTime[0] = addTime[0] / td;
        avgTime[1] = addTime[1] / td;
        avgTime[2] = addTime[2] / td;

        avgTime[1] += (avgTime[0] * 60) % 60;
        avgTime[2] += (avgTime[1] * 100) % 100;

        avgTime[0] = Math.floor(avgTime[0]);
        avgTime[1] = Math.floor(avgTime[1]);
        avgTime[2] = Math.floor(avgTime[2]);

        this.props.onFinish(addTime, avgTime);
    }

    startTimer() {
        timeTaken.milsec++;

        if (timeTaken.milsec > 99) {
            timeTaken.seconds++;
            timeTaken.milsec = 0;
        }

        if (timeTaken.seconds > 59) {
            timeTaken.minutes++;
            timeTaken.seconds = 0;
        }
    }

    startWatch() {
        Interval = setInterval(this.startTimer, 10);
    }

    changeImage() {
        //Pause the StopWatch
        clearInterval(Interval);
        this.updateButton();

        //To pass values to Parent (App.js);
        let t = timeTaken.minutes + ":" + timeTaken.seconds + ":" + timeTaken.milsec;
        this.props.onNextImage(fileDir[activeIndex].fileName, fileDir[activeIndex].id, t);

        //Add the time to find total time take
        addTime[2] += timeTaken.milsec;
        if (addTime[2] > 99) {
            addTime[1] += Math.floor(addTime[2] / 100);
            addTime[2] %= 100;
        }
        addTime[1] += timeTaken.seconds;
        if (addTime[1] > 59) {
            addTime[0] += Math.floor(addTime[1] / 60);
            addTime[1] %= 60;
        }
        addTime[0] += timeTaken.minutes;
        
        //Clear the StopWatch
        timeTaken.milsec = timeTaken.seconds = timeTaken.minutes = 0;

        //Load next image
        taskDone++;
        //Change here to lock the images
        if( taskDone === 50 )
        this.setState({ buttonText: "Finish!" })

        if (taskDone > 50) {
            this.setState({
                isopen: true
            })
        }
        else
            do {
                flag = true;
                activeIndex = Math.floor(Math.random() * 50);

                for (var i = 0; i < usedImages.length; i++)
                    if (usedImages[i] === activeIndex)
                        flag = false;

                if (flag === true) {
                    usedImages.push(activeIndex);
                    fileName= fileDir[activeIndex].fileName;
                }
            } while (flag !== true);

        //Start the Watch
        this.startWatch();
    }

    render() {
        return (
            <div>
                <Image className="imageStyling" src={fileName} />

                <Label style={{ zIndex: "1", position: "fixed", top: "10px", right: '4vw' }} color="teal">
                    {taskDone}/50
                </Label>

                <div className="NextButton" style={{ width: '180px' }} >
                    {this.state.activeNext ?
                        <Button primary animated size='huge' onClick={this.changeImage.bind(this)}>
                        <Button.Content visible> {this.state.buttonText} </Button.Content>
                        <Button.Content hidden>
                            <Icon name='right arrow' />
                        </Button.Content>
                    </Button>
                    :
                    <Button disabled size='huge'>{this.state.buttonText}</Button>
                    }
                </div>

                <Modal open={this.state.isopen} basic dimmer="blurring" style={{ position: "fixed", width: "auto", marginTop: "30vh", marginLeft: "38vw" }}>
                    <Header icon='check square outline' style={{ textAlign: "center" }} content='Task Completed!' />
                    <Modal.Content>
                        <h2> Thank you for your participation! <br />
                            Please download the result. </h2>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button color='blue' inverted onClick={this.OnFinish.bind(this)}>
                        <Icon name='download icon' /> Download Result
                        </Button>
                    </Modal.Actions>
                </Modal>
            </div>
        );
    }
}