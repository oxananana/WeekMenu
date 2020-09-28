import React from "react";

export const Icon = ({ name }) => {
  return icons[name];
};

const icons = {
  camera: (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M6.93702 5.84538C7.00787 5.74688 7.08656 5.62631 7.18689 5.46372C7.22355 5.40433 7.32349 5.23944 7.39792 5.11665L7.39798 5.11654L7.4818 4.97841C8.31079 3.62239 8.91339 3 10 3H14C15.0866 3 15.6892 3.62239 16.5182 4.97841L16.6021 5.11664C16.6765 5.23943 16.7765 5.40433 16.8131 5.46372C16.9134 5.62631 16.9921 5.74688 17.063 5.84538C17.1097 5.91033 17.1505 5.96194 17.1838 6H20C21.6569 6 23 7.34315 23 9V18C23 19.6569 21.6569 21 20 21H4C2.34315 21 1 19.6569 1 18V9C1 7.34315 2.34315 6 4 6H6.8162C6.84949 5.96194 6.8903 5.91033 6.93702 5.84538ZM4 8C3.44772 8 3 8.44772 3 9V18C3 18.5523 3.44772 19 4 19H20C20.5523 19 21 18.5523 21 18V9C21 8.44772 20.5523 8 20 8H17C16.3357 8 15.8876 7.63641 15.4394 7.01326C15.3363 6.86988 15.2341 6.71332 15.1111 6.51409C15.069 6.44583 14.9596 6.26536 14.8846 6.14152L14.8118 6.02159C14.3595 5.28172 14.0867 5 14 5H10C9.91327 5 9.6405 5.28172 9.1882 6.02159L9.11543 6.14152L9.11502 6.14219C9.03998 6.26601 8.93092 6.44596 8.88887 6.51409C8.76592 6.71332 8.66375 6.86988 8.56061 7.01326C8.11237 7.63641 7.66434 8 7 8H4ZM20 10C20 10.5523 19.5523 11 19 11C18.4477 11 18 10.5523 18 10C18 9.44772 18.4477 9 19 9C19.5523 9 20 9.44772 20 10ZM7 13C7 15.7614 9.23858 18 12 18C14.7614 18 17 15.7614 17 13C17 10.2386 14.7614 8 12 8C9.23858 8 7 10.2386 7 13ZM15 13C15 14.6569 13.6569 16 12 16C10.3431 16 9 14.6569 9 13C9 11.3431 10.3431 10 12 10C13.6569 10 15 11.3431 15 13Z" />
    </svg>
  ),
  camera_plus: (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M6.93702 5.84538C7.00787 5.74688 7.08656 5.62631 7.18689 5.46372C7.22356 5.40431 7.32355 5.23934 7.39799 5.11653L7.4818 4.97841C8.31079 3.62239 8.91339 3 10 3H15V5H10C9.91327 5 9.6405 5.28172 9.1882 6.02159L9.11542 6.14154L9.11524 6.14183C9.04019 6.26566 8.93096 6.44589 8.88887 6.51409C8.76592 6.71332 8.66375 6.86988 8.56061 7.01326C8.11237 7.63641 7.66434 8 7 8H4C3.44772 8 3 8.44772 3 9V18C3 18.5523 3.44772 19 4 19H20C20.5523 19 21 18.5523 21 18V12H23V18C23 19.6569 21.6569 21 20 21H4C2.34315 21 1 19.6569 1 18V9C1 7.34315 2.34315 6 4 6H6.8162C6.84949 5.96194 6.8903 5.91033 6.93702 5.84538ZM17 8V6H19V4H21V6H23V8H21V10H19V8H17ZM12 18C9.23858 18 7 15.7614 7 13C7 10.2386 9.23858 8 12 8C14.7614 8 17 10.2386 17 13C17 15.7614 14.7614 18 12 18ZM12 16C13.6569 16 15 14.6569 15 13C15 11.3431 13.6569 10 12 10C10.3431 10 9 11.3431 9 13C9 14.6569 10.3431 16 12 16Z" />
    </svg>
  ),
  check: (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M9.70711 14.2929L19 5L20.4142 6.41421L9.70711 17.1213L4 11.4142L5.41421 10L9.70711 14.2929Z" />
    </svg>
  ),
  plus: (
    <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
      <path d="M9 7H14V9H9V14H7V9H2V7H7V2H9V7Z" />
    </svg>
  ),
  close: (
    <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
      <path d="M8.00001 9.41429L3.70712 13.7072L2.29291 12.293L6.5858 8.00008L2.29291 3.70718L3.70712 2.29297L8.00001 6.58586L12.2929 2.29297L13.7071 3.70718L9.41423 8.00008L13.7071 12.293L12.2929 13.7072L8.00001 9.41429Z" />
    </svg>
  ),
  delete: (
    <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
      <path d="M1.25 4C1.25 3.58579 1.58579 3.25 2 3.25H14C14.4142 3.25 14.75 3.58579 14.75 4C14.75 4.41421 14.4142 4.75 14 4.75H2C1.58579 4.75 1.25 4.41421 1.25 4Z" />
      <path d="M6.66671 2.08331C6.34454 2.08331 6.08337 2.34448 6.08337 2.66665V3.99998C6.08337 4.41419 5.74759 4.74998 5.33337 4.74998C4.91916 4.74998 4.58337 4.41419 4.58337 3.99998V2.66665C4.58337 1.51605 5.51611 0.583313 6.66671 0.583313H9.33337C10.484 0.583313 11.4167 1.51605 11.4167 2.66665V3.99998C11.4167 4.41419 11.0809 4.74998 10.6667 4.74998C10.2525 4.74998 9.91671 4.41419 9.91671 3.99998V2.66665C9.91671 2.34448 9.65554 2.08331 9.33337 2.08331H6.66671ZM3.33337 3.24998C3.74759 3.24998 4.08337 3.58577 4.08337 3.99998V13.3333C4.08337 13.6555 4.34454 13.9166 4.66671 13.9166H11.3334C11.6555 13.9166 11.9167 13.6555 11.9167 13.3333V3.99998C11.9167 3.58577 12.2525 3.24998 12.6667 3.24998C13.0809 3.24998 13.4167 3.58577 13.4167 3.99998V13.3333C13.4167 14.4839 12.484 15.4166 11.3334 15.4166H4.66671C3.51611 15.4166 2.58337 14.4839 2.58337 13.3333V3.99998C2.58337 3.58577 2.91916 3.24998 3.33337 3.24998Z" />
      <path d="M6.66663 6.58331C7.08084 6.58331 7.41663 6.9191 7.41663 7.33331V11.3333C7.41663 11.7475 7.08084 12.0833 6.66663 12.0833C6.25241 12.0833 5.91663 11.7475 5.91663 11.3333V7.33331C5.91663 6.9191 6.25241 6.58331 6.66663 6.58331Z" />
      <path d="M9.33337 6.58331C9.74759 6.58331 10.0834 6.9191 10.0834 7.33331V11.3333C10.0834 11.7475 9.74759 12.0833 9.33337 12.0833C8.91916 12.0833 8.58337 11.7475 8.58337 11.3333V7.33331C8.58337 6.9191 8.91916 6.58331 9.33337 6.58331Z" />
    </svg>
  ),
};

export default Icon;
