// "use client";
// import * as React from 'react';
// import Popover from '@mui/material/Popover';
// import Typography from '@mui/material/Typography';
// import UserCard from './UserCard';

// //quitar
// const user = {
//   name: "Juan miguel perez",
//   email: "juanmi@gmail.com",
//   phone: "1234566789",
//   verified: true,
// };

// export default function MouseOverPopover() {
//   const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

//   const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handlePopoverClose = () => {
//     setAnchorEl(null);
//   };

//   const popoverOpen = Boolean(anchorEl);

//   return (
//     <div style={{color: "black"}}>
//       <Typography sx = {{color: "black"}}
//         aria-owns={popoverOpen ? 'mouse-over-popover' : undefined}
//         aria-haspopup="true"
//         onMouseEnter={handlePopoverOpen}
//         onMouseLeave={handlePopoverClose}
//       >
//         Hover with a Popover.
//       </Typography>
//       <Popover
//         id="mouse-over-popover"
//         sx={{
//           pointerEvents: 'none',
//         }}
//         open={popoverOpen}
//         anchorEl={anchorEl}
//         anchorOrigin={{
//           vertical: 'bottom',
//           horizontal: 'left',
//         }}
//         transformOrigin={{
//           vertical: 'top',
//           horizontal: 'left',
//         }}
//         onClose={handlePopoverClose}
//         disableRestoreFocus
//       >
        
//         <UserCard user={user } />
//       </Popover>
//     </div>
//   );
// }