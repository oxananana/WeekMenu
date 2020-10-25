import React from "react";

export const Icon = ({ name }) => {
  return icons[name];
};

export const iconForBg = (name) => {
  return `url('data:image/svg+xml;utf8,${stringIcons[name]}')`;
};

export const stringIcons = {
  chevron_bottom:
    '<svg  fill="gray" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M19.2929 7.29285L20.7071 8.70706L12 17.4142L3.29291 8.70706L4.70712 7.29285L12 14.5857L19.2929 7.29285Z" fill-rule="evenodd" clip-rule="evenodd"/></svg>',
};

const icons = {
  warning: (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M22.4415 15.9532L15.4362 3.97762C14.7329 2.7584 13.4221 2.00166 12.0045 2C10.5867 1.99834 9.2754 2.75196 8.56336 3.97767L1.55543 15.9576C0.828751 17.1795 0.812312 18.7105 1.51618 19.9592C2.22063 21.2089 3.53966 21.9866 4.9744 21.9983L19.0123 21.9983C20.4619 21.9842 21.7784 21.2089 22.4828 19.9603C23.1863 18.7132 23.1706 17.1856 22.4415 15.9532ZM3.27808 16.9737L10.2912 4.98491C10.6464 4.37354 11.2978 3.99918 12.0021 4C12.7064 4.00083 13.3576 4.37673 13.7068 4.98222L20.7177 16.9672C21.0852 17.5885 21.0931 18.3533 20.7408 18.9777C20.3881 19.603 19.7287 19.9913 19.0025 19.9984L4.98253 19.9983C4.27193 19.9925 3.61123 19.6029 3.25844 18.9771C2.90604 18.3519 2.91427 17.5855 3.27808 16.9737ZM12.0003 17.9983C12.5528 17.9983 13.0007 17.5506 13.0007 16.9983C13.0007 16.4461 12.5528 15.9983 12.0003 15.9983C11.4479 15.9983 11 16.4461 11 16.9983C11 17.5506 11.4479 17.9983 12.0003 17.9983ZM13.0036 7.99835H11.003V14.9983H13.0036V7.99835Z" />
    </svg>
  ),
  info: (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M1 12C1 18.0751 5.92487 23 12 23C18.0751 23 23 18.0751 23 12C23 5.92487 18.0751 1 12 1C5.92487 1 1 5.92487 1 12ZM21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12ZM13.0036 13.9983H14.003V15.9983H10.003V13.9983H11.003V11.9983H10.003V9.99835H13.0036V13.9983ZM13.0007 7.99835C13.0007 8.55063 12.5528 8.99835 12.0003 8.99835C11.4479 8.99835 11 8.55063 11 7.99835C11 7.44606 11.4479 6.99835 12.0003 6.99835C12.5528 6.99835 13.0007 7.44606 13.0007 7.99835Z" />
    </svg>
  ),
  success: (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 23C5.92487 23 1 18.0751 1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23ZM12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21ZM15.2929 8.29289L10 13.5858L7.70711 11.2929L6.29289 12.7071L10 16.4142L16.7071 9.70711L15.2929 8.29289Z" />
    </svg>
  ),
  sun: (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M13 5.07089C12.6734 5.02417 12.3395 5 12 5C11.6605 5 11.3266 5.02417 11 5.07089V1.04484C11.3294 1.01516 11.6629 1 12 1C12.3371 1 12.6706 1.01516 13 1.04484V5.07089ZM7 12C7 14.7614 9.23858 17 12 17C14.7614 17 17 14.7614 17 12C17 9.23858 14.7614 7 12 7C9.23858 7 7 9.23858 7 12ZM15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12ZM13 22.9552V18.9291C12.6734 18.9758 12.3395 19 12 19C11.6605 19 11.3266 18.9758 11 18.9291V22.9552C11.3294 22.9848 11.6629 23 12 23C12.3371 23 12.6706 22.9848 13 22.9552ZM18.9291 11H22.9552C22.9848 11.3294 23 11.6629 23 12C23 12.3371 22.9848 12.6706 22.9552 13H18.9291C18.9758 12.6734 19 12.3395 19 12C19 11.6605 18.9758 11.3266 18.9291 11ZM5 12C5 11.6605 5.02417 11.3266 5.07089 11H1.04484C1.01516 11.3294 1 11.6629 1 12C1 12.3371 1.01516 12.6706 1.04484 13H5.07089C5.02417 12.6734 5 12.3395 5 12ZM16.1922 6.39362L19.0391 3.54673C19.5521 3.9744 20.0256 4.44791 20.4533 4.96094L17.6064 7.80783C17.2049 7.27173 16.7283 6.79513 16.1922 6.39362ZM3.54673 4.96094L6.39362 7.80783C6.79513 7.27173 7.27173 6.79513 7.80783 6.39362L4.96094 3.54673C4.44791 3.9744 3.9744 4.44791 3.54673 4.96094ZM17.6064 16.1922L20.4533 19.0391C20.0256 19.5521 19.5521 20.0256 19.0391 20.4533L16.1922 17.6064C16.7283 17.2049 17.2049 16.7283 17.6064 16.1922ZM4.96094 20.4533L7.80783 17.6064C7.27173 17.2049 6.79513 16.7283 6.39362 16.1922L3.54673 19.0391C3.9744 19.5521 4.44791 20.0256 4.96094 20.4533Z" />
    </svg>
  ),
  moon: (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M13 9C13 7.02543 13.8205 5.18477 15.2398 3.86765L16.7174 2.49647L14.7317 2.14956C14.1634 2.05029 13.5847 2 13 2C7.47715 2 3 6.47715 3 12C3 17.5228 7.47715 22 13 22C16.3854 22 19.4843 20.3038 21.3266 17.5396L22.4432 15.8643L20.4336 15.9868C20.2898 15.9956 20.1452 16 20 16C16.134 16 13 12.866 13 9ZM13 20C8.58172 20 5 16.4183 5 12C5 7.74791 8.31735 4.27062 12.5051 4.01506C11.5367 5.46848 11 7.19184 11 9C11 13.439 14.2137 17.1274 18.4414 17.8655C16.9878 19.2153 15.061 20 13 20Z" />
    </svg>
  ),
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
      <path d="M6.08325 2.66659C6.08325 2.34442 6.34442 2.08325 6.66659 2.08325H9.33325C9.65542 2.08325 9.91659 2.34442 9.91659 2.66659V3.25H6.08325V2.66659ZM4.58325 3.25V2.66659C4.58325 1.51599 5.51599 0.583252 6.66659 0.583252H9.33325C10.4839 0.583252 11.4166 1.51599 11.4166 2.66659V3.25H12.6554L12.6666 3.24992L12.6777 3.25H14C14.4142 3.25 14.75 3.58579 14.75 4C14.75 4.41421 14.4142 4.75 14 4.75H13.4166V13.3332C13.4166 14.4838 12.4839 15.4165 11.3333 15.4165H4.66659C3.51599 15.4165 2.58325 14.4838 2.58325 13.3332V4.75H2C1.58579 4.75 1.25 4.41421 1.25 4C1.25 3.58579 1.58579 3.25 2 3.25H3.32211L3.33325 3.24992L3.34439 3.25H4.58325ZM4.08325 4.75V13.3332C4.08325 13.6554 4.34442 13.9165 4.66659 13.9165H11.3333C11.6554 13.9165 11.9166 13.6554 11.9166 13.3332V4.75H4.08325ZM6.66675 6.58325C7.08096 6.58325 7.41675 6.91904 7.41675 7.33325V11.3332C7.41675 11.7474 7.08096 12.0832 6.66675 12.0832C6.25253 12.0832 5.91675 11.7474 5.91675 11.3332V7.33325C5.91675 6.91904 6.25253 6.58325 6.66675 6.58325ZM10.0833 7.33325C10.0833 6.91904 9.74747 6.58325 9.33325 6.58325C8.91904 6.58325 8.58325 6.91904 8.58325 7.33325V11.3332C8.58325 11.7474 8.91904 12.0832 9.33325 12.0832C9.74747 12.0832 10.0833 11.7474 10.0833 11.3332V7.33325Z" />
    </svg>
  ),
};

export default Icon;
