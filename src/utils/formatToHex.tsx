import React from "react";

// const formatToHex = (value: string, active: any) => {
//     if (value.indexOf("#") === 0) {
//         if (value.length == 7) {
//           // set lai input color bang input text
//           inputColor1.value = value;
//           setColorInputText(inputColor1.value);
//         } else if (
//           value.length < 7 ||
//           value.length > 7
//         ) {
//           let hexCode = "";
//           // set lai input text duoi dang 6 digits hex
//           if (value.length === 2) {
//             for (let i = 1; i <= 6; i++) {
//               hexCode += value[1];
//             }
//           } else if (value.length === 3) {
//             for (let i = 1; i <= 3; i++) {
//               hexCode += value[1] + value[2];
//             }
//           } else if (
//             4 <= value.length &&
//             value.length <= 6
//           ) {
//             hexCode =
//               value[1] +
//               value[1] +
//               value[2] +
//               value[2] +
//               value[3] +
//               value[3];
//           } else {
//             for (let i = 1; i <= 6; i++) {
//               hexCode += value[i];
//             }
//           }
//           value = "#" + hexCode;
//           inputColor1.value = value;
//         }
//       } 
//       // không có #
//       else {
//         if (value.length == 6) {
//           // set lai input color bang input text
//           inputColor1.value = "#" + value;
//           setColorInputText(inputColor1.value);
//         } else if (
//           value.length < 6 ||
//           value.length > 6
//         ) {
//           let hexCode = "";
//           // set lai input text duoi dang 6 digits hex
//           if (value.length === 1) {
//             for (let i = 1; i <= 6; i++) {
//               hexCode += value[0];
//             }
//           } else if (value.length === 2) {
//             for (let i = 1; i <= 3; i++) {
//               hexCode += value[0] + value[1];
//             }
//           } else if (
//             3 <= value.length &&
//             value.length <= 5
//           ) {
//             hexCode =
//               value[0] +
//               value[0] +
//               value[1] +
//               value[1] +
//               value[2] +
//               value[2]
//           } 
//           else {
//             for (let i = 1; i <= 5; i++) {
//               hexCode += value[i];
//             }
//           }
//           value = "#" + hexCode;
//           inputColor1.value = value;
//         }
//       }
// }

// export default formatToHex;