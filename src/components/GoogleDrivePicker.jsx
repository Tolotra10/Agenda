// import React from 'react';
// import  { useEffect } from 'react';
// import useDrivePicker from 'react-google-drive-picker'
// const GoogleDrivePicker = () => {
//     const [openPicker, authResponse] = useDrivePicker();
//     const handleOpenPicker = () => {
//         openPicker({
//           clientId: "508032539535-mqgco87mg1ff6h7rgdgd27h3b0skj902.apps.googleusercontent.com",
//           developerKey: "AIzaSyBfc9ydQYVsks9KlIk_2UOo-bD9GeKNoGM",
//           viewId: "DOCS",
//           // token: token, // pass oauth token in case you already have one
//           showUploadView: true,
//           showUploadFolders: true,
//           supportDrives: true,
//           multiselect: true,
//           // customViews: customViewsArray, // custom view
//           callbackFunction: (data) => {
//             if (data.action === 'cancel') {
//               console.log('User clicked cancel/close button')
//             }
//             console.log(data)
//           },
//         })
//       }
//     return (
//         <div>
//             <button onClick={() => handleOpenPicker()}>Open Picker</button>
//         </div>
//     );
// };

// export default GoogleDrivePicker;