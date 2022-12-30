import React, { useRef } from "react";
// import logo from './logo.svg';
import * as tf from "@tensorflow/tfjs";
import * as handpose from "@tensorflow-models/hand-pose-detection";
import Webcam from "react-webcam";
import "./App.css";
import { drawHand } from "./utilities";

var x = new Array(2);

const fs = require('fs');

for (var i = 0; i < x.length; i++) {
  x[i] = new Array(62);
}

function createCSVTable () {
  x[0][0] = "x";
  x[0][1] = "y";
  x[0][2] = "z";
  x[0][3] = "x";
  x[0][4] = "y";
  x[0][5] = "z";
  x[0][6] = "x";
  x[0][7] = "y";
  x[0][8] = "z";
  x[0][9] = "x";
  x[0][10] = "y";
  x[0][11] = "z";
  x[0][12] = "x";
  x[0][13] = "y";
  x[0][14] = "z";
  x[0][15] = "x";
  x[0][16] = "y";
  x[0][17] = "z";
  x[0][18] = "x";
  x[0][19] = "y";
  x[0][20] = "z";
  x[0][21] = "x";
  x[0][22] = "y";
  x[0][23] = "z";
  x[0][24] = "x";
  x[0][25] = "y";
  x[0][26] = "z";
  x[0][27] = "x";
  x[0][28] = "y";
  x[0][29] = "z";
  x[0][30] = "x";
  x[0][31] = "y";
  x[0][32] = "z";
  x[0][33] = "x";
  x[0][34] = "y";
  x[0][35] = "z";
  x[0][36] = "x";
  x[0][37] = "y";
  x[0][38] = "z";
  x[0][39] = "x";
  x[0][40] = "y";
  x[0][41] = "z";
  x[0][42] = "x";
  x[0][43] = "y";
  x[0][44] = "z";
  x[0][45] = "x";
  x[0][46] = "y";
  x[0][47] = "z";
  x[0][48] = "x";
  x[0][49] = "y";
  x[0][50] = "z";
  x[0][51] = "x";
  x[0][52] = "y";
  x[0][53] = "z";
  x[0][54] = "x";
  x[0][55] = "y";
  x[0][56] = "z";
  x[0][57] = "x";
  x[0][58] = "y";
  x[0][59] = "z";
  x[0][60] = "x";
  x[0][61] = "y";
  x[0][62] = "z";
}

createCSVTable();

function App() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  const runHandpose = async () => {
    const model = handpose.SupportedModels.MediaPipeHands;
    const detectorConfig = {
      runtime: 'tfjs',
      modelType: 'full'
    };
    const net = await handpose.createDetector(model, detectorConfig);


    //const net = await handpose.load();
    console.log("Handpose model loaded.");
    //  Loop and detect hands
    setInterval(() => {
      detect(net);
    }, 100);
  };

  const detect = async (net) => {
    // Check data is available
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      // Get Video Properties
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      // Set video width
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      // Set canvas height and width
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      // Make Detections
      const hand = await net.estimateHands(video);
      console.log(hand);
      
      if (hand.length != 0) {
        console.log(hand[0]);
        console.log(hand[0].keypoints3D);

        let fInput = "";

        for (let g = 0; g < 21; g++) {
          if (g == 20) {
            fInput = fInput + (hand[0].keypoints3D[g].x).toString() + "," + (hand[0].keypoints3D[g].y).toString() + "," + (hand[0].keypoints3D[g].z).toString();
          }

          fInput = fInput + (hand[0].keypoints3D[g].x).toString() + "," + (hand[0].keypoints3D[g].y).toString() + "," + (hand[0].keypoints3D[g].z).toString() + ",";
        }

        console.log(fInput);

        fs.appendFile('/Users/airy/Desktop/ConradTFv3/handpose/src/data.csv', fInput, (err) => {
          if (err) throw err;
        })
      }

      // Draw mesh
      //const ctx = canvasRef.current.getContext("2d");
      //drawHand(hand, ctx);
    }
  };

  runHandpose();

  return (
    <div className="App">
      <header className="App-header">
        <Webcam
          ref={webcamRef}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zindex: 9,
            width: 640,
            height: 480,
          }}
        />

        <canvas
          ref={canvasRef}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zindex: 9,
            width: 640,
            height: 480,
          }}
        />
      </header>
    </div>
  );
}

export default App;