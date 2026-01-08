// export default function ToDo({ task }) {
//   return (
//     <>
//       <li>Task: {task}</li>
//     </>
//   );
// }

// export default function ToDo({ task, isDone, time = 0 }) {
// //   if (isDone === true) {
// //     return (
// //       <>
// //         <li>
// //           Done: {task} Duration: {time}
// //         </li>
// //       </>
// //     );
// //   } else {
// //     return (
// //       <li>
// //         Do now: {task} Duration: {time}
// //       </li>
// //     );
// //   }

// }
// export default function ToDo({ task, isDone, time = 0 }) {
//   return isDone ? (
//     <li>
//       Done Task: {task} Duration : {time}
//     </li>
//   ) : (
//     <li>Not Done Task: {task} </li>
//   );
// }
// export default function ToDo({ task, isDone, time = 0 }) {
//   return (
//     isDone && (
//       <li>
//         Done Task: {task} Duration : {time}
//       </li>
//     )
//   );
// }
// export default function ToDo({ task, isDone, time = 0 }) {
//   return (
//     isDone || (
//       <li>
//         Done Task: {task} Duration : {time}
//       </li>
//     )
//   );
// }

export default function ToDo({ task, isDone, time = 0 }) {
  let listItem;
  if (isDone === true) {
    listItem = (
      <li>
        Done : {task} Duration: {time}
      </li>
    );
  }
  return listItem;
}
