import styled from "styled-components";

interface LogoProps {
  height?: number;
  width?: number;
  isDark?: boolean;
  onClick?: () => void;
}

export function Logo(props: LogoProps): JSX.Element {
  const { height = 70, width = 140, isDark, onClick } = props;
  const color = isDark ? "#1f2b49" : "#ffffff";
  return (
    <StyledSvg
      viewBox="0 0 858 270"
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
      onClick={onClick}
      style={{ maxWidth: width, maxHeight: height, width: "100%" }}
    >
      <defs>
        <clipPath id="a">
          <path d="M1920 0v1080H0V0h1920Z" />
        </clipPath>
        <clipPath id="b">
          <path d="M85.846.003c1.922-.09 3.346 1.752 2.78 3.592l-32.19 106.321a3.045 3.045 0 0 1-2.764 2.15l-18.161.852a3.062 3.062 0 0 1-3.088-2.188L.115 4.066a2.49 2.49 0 0 1 2.26-3.23L14.051.277l5.381-.265a3.01 3.01 0 0 1 3.031 2.135l1.084 3.577 20.771 68.63 21.603-71.41A3.01 3.01 0 0 1 68.672.808Z" />
        </clipPath>
        <clipPath id="c">
          <path d="m58.893 3.594-34.09 112.664c-1.612 5.638-.146 9.32 3.752 10.914 1.854.781 2.749 1.76 1.885 4.252l-4.595 15.52a2.909 2.909 0 0 1-2.787 2.081l-2 .005c-29.526 0-19.371-31.549-19.371-31.549l34.5-114.536a3.008 3.008 0 0 1 2.75-2.137L56.114.003c1.922-.092 3.346 1.753 2.78 3.591Z" />
        </clipPath>
        <clipPath id="d">
          <path d="m58.893 3.594-34.09 112.664c-1.612 5.638-.146 9.32 3.752 10.914 1.854.781 2.749 1.76 1.885 4.252l-4.595 15.52a2.909 2.909 0 0 1-2.787 2.081l-2 .005c-29.526 0-19.371-31.549-19.371-31.549l34.5-114.536a3.007 3.007 0 0 1 2.75-2.137L56.114.003c1.922-.092 3.346 1.753 2.78 3.591Z" />
        </clipPath>
        <clipPath id="e">
          <path d="M105.475 3.553 90.52 52.946l-6.002 19.863-1.973 6.5c-1.593 5.526-.206 9.173 3.52 10.813l.227.096c1.857.78 2.752 1.758 1.89 4.245l-4.609 15.52a2.896 2.896 0 0 1-2.786 2.088h-1.989c-8.755 0-14.028-2.77-17.112-6.665l-.149.099c-18.537 12.088-50.172 7.86-58.86-16.48-9.02-25.236 6.3-61.281 22.898-76.22C43.962-3.76 66.81-2.466 80.621 10.119l2.172-7.18A3.001 3.001 0 0 1 85.53.799l17.144-.795c1.907-.1 3.333 1.725 2.802 3.549Zm-67.25 25.55c-9.437 8.06-18.86 28.031-16.73 44.276l.155 1.079.035.21c.577 3.365 3.341 14.79 16.64 16.313C56 92.987 67.888 63.24 68.932 43.46c.266-5.123-.978-9.881-3.532-13.745-5.902-8.82-16.298-9.898-27.175-.613Z" />
        </clipPath>
        <clipPath id="f">
          <path d="m55.43 0 .562.008c3.383.073 8.526.658 14.486 2.928l1.422.556c2.916 1.174 21.093 9.595 19.768 36.528-.183 3.708-.524 7.714-1.25 12.043l-.274 1.564c-.13.711-.307 1.634-.494 2.565a4.441 4.441 0 0 1-4.143 3.569l-20.036.994-41.81 2.002c-1.676.077-2.291 4.192-2.39 5.835-.639 10.593 7.355 25.831 23.714 20.548 6.53-2.109 11.904-6.844 15.116-12.881 1.661-3.12 5.231-2.825 5.231-2.825l17.645-.884c1.459-.063 2.536 1.38 2.003 2.731-9.985 25.275-24.97 34.173-45.488 35.974-17.008 1.493-52.318-11.966-34.687-64.732C17.398 8.88 39.441 1.451 51.039.277l.752-.073C52.05.166 53.193.011 55.016 0h.414ZM29.435 39.679l-.155.34c-.925 2.1-.8 3.13 1.722 2.997l37.558-1.863c1.629-.077 2.948-1.412 2.948-3.041-.016-7.527-6.565-12.99-9.87-14.573-12.031-5.107-24.884 2.263-32.203 16.14Z" />
        </clipPath>
        <clipPath id="g">
          <path d="M143.335.004c1.924-.1 3.35 1.74 2.785 3.58l-37.156 122.149-.398 1.26 4.643.017 28.501.099a2.379 2.379 0 0 1 2.246 3.064l-4.535 15.615a4.332 4.332 0 0 1-4.166 3.124l-32.925-.048a.761.761 0 0 0-.73.534L85.735 199.93c-10.555 31.88-32.122 36.057-52.521 29.79a.7.7 0 0 1-.073-.025C-7.611 214.002-3.763 176.115 7.89 155.13c13.828-24.904 33.973-28.187 74.695-27.922h1.823a2.453 2.453 0 0 0 2.338-1.74l4.162-13.928c.215-.746-.365-1.128-.928-.995-4.726 1.227-9.849 1.526-9.849 1.526-7.843.48-19.681-2.057-28.303-10.131l-.05-.05c-9.185-8.605-15.187-23.627-8.406-47.718L58.925 2.938A2.981 2.981 0 0 1 61.677.8L78.838.004c1.923-.1 3.349 1.74 2.785 3.58L63.318 63.789C57.167 85.492 75.372 95.87 88.421 88.875c8.058-4.278 11.64-10.38 15.154-20.461.614-1.857 10.198-33.625 10.198-33.625l9.633-31.851c.381-1.226 1.475-2.09 2.752-2.138ZM76.043 148.63h-6.557c-28.153 0-34.669 6.996-40.804 16.895-6.019 9.567-6.566 22.864-1.327 32.348 4.013 7.263 10.844 11.259 19.25 11.259 11.623 0 16.581-15.786 16.614-15.934l13.553-43.578a.764.764 0 0 0-.729-.99Z" />
        </clipPath>
        <clipPath id="h">
          <path d="M105.76 3.155v.017l-.2.646-22.88 75.624c-1.609 5.637-.15 9.334 3.746 10.926 1.857.779 2.753 1.757 1.891 4.245l-4.593 15.519a2.91 2.91 0 0 1-2.785 2.089h-2.007c-8.689 0-13.928-2.736-17.012-6.583-3.564 2.172-11.755 6.036-22.25 6.434-7.843.48-19.682-2.056-28.303-10.131l-.049-.05C2.132 93.286-3.87 78.264 2.911 54.173L18.463 2.94A2.982 2.982 0 0 1 21.216.8l17.16-.795c1.924-.1 3.35 1.74 2.786 3.58L22.857 63.79c-6.15 21.703 12.054 32.083 25.103 25.086 8.058-4.278 11.64-10.38 15.154-20.461.276-.836 2.37-7.729 4.588-15.058l.296-.98c2.622-8.664 5.314-17.587 5.314-17.587l9.633-31.85.059-.166a.56.56 0 0 1 .04-.083A2.975 2.975 0 0 1 85.697.8l17.177-.796c1.775-.1 3.117 1.459 2.885 3.15Z" />
        </clipPath>
        <clipPath id="i">
          <path d="M116.9 3.585 82.543 116.614c-1.593 5.526-.205 9.173 3.52 10.814l.227.096c1.858.779 2.753 1.757 1.891 4.244l-4.609 15.52a2.897 2.897 0 0 1-2.786 2.089h-1.99c-8.754 0-14.027-2.77-17.11-6.666l-.15.1C43 154.898 11.365 150.67 2.677 126.33c-9.02-25.235 6.3-61.281 22.898-76.22 18.387-16.564 41.235-15.271 55.046-2.686L94.184 2.939c.382-1.227 1.476-2.09 2.752-2.14l17.178-.795c1.922-.1 3.35 1.74 2.785 3.58ZM38.224 66.409c-9.437 8.058-18.86 28.03-16.73 44.276l.14.981.015.096.035.21c.576 3.364 3.339 14.791 16.64 16.315 17.674 2.006 29.562-27.74 30.607-47.52.266-5.123-.979-9.882-3.53-13.745-5.905-8.821-16.3-9.9-27.177-.613Z" />
        </clipPath>
        <clipPath id="j">
          <path d="M73.778 3.585 62.603 40.477c14.757-5.787 30.06-2.604 40.29 6.848 26.661 25.052 1.244 83.714-19.234 95.237-14.922 9.733-38.334 8.887-51.43-4.51l-.49.786c-2.161 3.4-7.96 10.894-29.025 10.025-.763 0-1.542-.25-1.989-.796-.58-.713-.912-1.724-.614-2.736l4.692-15.502c.667-1.824 1.15-2.42 1.917-2.584l.106-.02c1.56-.265 6.516.332 9.12-7.145L51.062 2.939a3.015 3.015 0 0 1 2.752-2.14L70.992.005c1.923-.1 3.35 1.74 2.786 3.58ZM61.343 66.409c-9.438 8.058-18.86 28.03-16.732 44.276l.14.981.016.096.035.21c.576 3.364 3.34 14.791 16.64 16.315 17.674 2.006 29.563-27.74 30.607-47.52.266-5.123-.978-9.882-3.53-13.745-5.904-8.821-16.3-9.9-27.176-.613Z" />
        </clipPath>
        <clipPath id="k" />
        <clipPath id="l">
          <path d="M15.674.471c6.068 1.915 9.205 9.118 7.005 16.089-2.2 6.971-8.902 11.069-14.971 9.154C1.64 23.799-1.497 16.596.703 9.625c2.2-6.971 8.903-11.069 14.97-9.154Z" />
        </clipPath>
        <clipPath id="m">
          <path d="M12.685 0C16.2 0 18.8 1.09 21.19 3.268c.316.281.316.702.034.984l-2.741 2.847a.615.615 0 0 1-.878 0 7.18 7.18 0 0 0-4.744-1.793c-3.972 0-6.888 3.303-6.888 7.239 0 3.901 2.952 7.135 6.924 7.135 1.651 0 3.444-.598 4.708-1.688.246-.21.703-.21.914.034l2.741 2.918c.246.246.21.702-.036.949-2.39 2.319-5.411 3.408-8.539 3.408C5.658 25.301 0 19.714 0 12.686A12.657 12.657 0 0 1 12.685 0Z" />
        </clipPath>
        <clipPath id="n">
          <path d="M12.018 0c.246 0 .492.175.598.387l10.999 23.65c.211.457-.071.914-.598.914h-3.9c-.632 0-.914-.211-1.23-.88l-1.266-2.776H7.063l-1.265 2.812c-.176.423-.561.844-1.265.844H.667c-.526 0-.807-.457-.597-.914L11.069.387c.105-.212.351-.387.597-.387h.352Zm-.175 10.718h-.036l-2.636 5.798h5.342l-2.67-5.798Z" />
        </clipPath>
        <clipPath id="o">
          <path d="m1.546 0 14.02 13.494h.037V1.018c0-.351.281-.667.667-.667h4.217a.69.69 0 0 1 .667.667v23.65c0 .351-.315.632-.667.632h-.563c-.106 0-.386-.104-.457-.174L5.588 11.173h-.036v13.11c0 .35-.281.667-.667.667H.702a.693.693 0 0 1-.668-.667L0 .631C0 .28.315 0 .667 0h.879Z" />
        </clipPath>
        <clipPath id="p">
          <path d="m1.547 0 14.02 13.494h.036V1.018c0-.351.282-.667.667-.667h4.218a.69.69 0 0 1 .667.667v23.65c0 .351-.316.632-.667.632h-.563c-.106 0-.386-.104-.457-.174L5.588 11.173h-.035v13.11c0 .35-.282.667-.667.667H.703a.693.693 0 0 1-.669-.667L0 .631C0 .28.316 0 .667 0h.88Z" />
        </clipPath>
        <clipPath id="q">
          <path d="M12.018 0c.246 0 .492.175.597.387l11 23.65c.211.457-.07.914-.598.914h-3.9c-.632 0-.915-.211-1.23-.88l-1.267-2.776H7.063l-1.265 2.812c-.177.423-.56.844-1.266.844H.667c-.526 0-.808-.457-.597-.914l11-23.65c.104-.212.35-.387.596-.387h.352Zm-.176 10.718h-.035l-2.636 5.798h5.342l-2.67-5.798Z" />
        </clipPath>
        <clipPath id="r">
          <path d="M8.858 0c4.146 0 7.554 2.846 7.554 6.536 0 2.706-2.424 4.673-4.077 5.552 1.865.773 4.709 2.495 4.709 5.727 0 3.937-3.478 6.783-7.66 6.783H.669A.668.668 0 0 1 0 23.931V.667C0 .315.283 0 .669 0h8.189Zm-.529 14.548H5.483v5.024h3.198c1.371 0 2.531-1.124 2.531-2.564 0-1.406-1.51-2.46-2.883-2.46Zm-.104-9.489H5.483v4.919h2.742c1.335 0 2.459-1.123 2.459-2.529 0-1.405-1.124-2.39-2.459-2.39Z" />
        </clipPath>
        <clipPath id="s">
          <path d="M4.885 0c.351 0 .669.315.669.667v23.265c0 .35-.318.667-.669.667H.669A.692.692 0 0 1 0 23.932V.667A.69.69 0 0 1 .669 0h4.216Z" />
        </clipPath>
        <clipPath id="t">
          <path d="M8.117 0c3.655 0 6.467 1.861 7.522 2.635.421.245.35.878.21 1.124l-1.792 2.706c-.246.387-.88.703-1.195.457-.316-.175-2.881-2.108-5.025-2.108-1.266 0-2.215.843-2.215 1.792 0 1.3 1.054 2.285 3.831 3.408 2.742 1.09 7.099 3.234 7.099 8.012 0 3.62-3.129 7.274-8.294 7.274-4.567 0-7.099-1.897-7.906-2.705-.352-.351-.456-.492-.177-.984l1.652-2.916c.282-.457.949-.388 1.195-.211.14.069 2.672 1.932 4.99 1.932 1.405 0 2.426-.877 2.426-2.109 0-1.474-1.231-2.599-3.62-3.549C3.796 13.564 0 11.209 0 6.993 0 3.513 2.706 0 8.117 0Z" />
        </clipPath>
        <clipPath id="u">
          <path d="M11.176 0c4.216 0 7.66 3.408 7.66 7.59 0 3.232-2.144 5.833-5.201 7.063l4.815 8.927c.247.456 0 1.019-.597 1.019h-4.674a.652.652 0 0 1-.563-.317l-4.674-9.313H5.518v8.963c0 .35-.316.667-.668.667H.669A.668.668 0 0 1 0 23.932V.667C0 .316.281 0 .669 0h10.507Zm-.457 5.024H5.518v5.483h5.201c1.441 0 2.67-1.336 2.67-2.811 0-1.477-1.229-2.672-2.67-2.672Z" />
        </clipPath>
        <clipPath id="v">
          <path d="M15.217 0c.387 0 .667.315.667.667v3.831c0 .351-.28.667-.667.667H5.482v4.357h8.012c.352 0 .669.317.669.669v3.829a.669.669 0 0 1-.669.669H5.482v4.745h9.735c.387 0 .667.315.667.667v3.831c0 .35-.28.667-.667.667H.669A.668.668 0 0 1 0 23.932V.667C0 .315.281 0 .669 0h14.548Z" />
        </clipPath>
        <clipPath id="w">
          <path d="M16.269 0c.388 0 .669.315.669.667v3.831a.667.667 0 0 1-.669.667h-5.024v18.767c0 .35-.316.667-.668.667H6.36a.69.69 0 0 1-.667-.667V5.165H.667A.666.666 0 0 1 0 4.498V.667C0 .315.28 0 .667 0h15.602Z" />
        </clipPath>
        <clipPath id="x">
          <path d="M4.885 0c.351 0 .669.315.669.667v23.265c0 .35-.318.667-.669.667H.668A.692.692 0 0 1 0 23.932V.667A.69.69 0 0 1 .668 0h4.217Z" />
        </clipPath>
        <clipPath id="y">
          <path d="M4.852 0a.69.69 0 0 1 .667.667v18.767h8.363c.387 0 .668.315.668.667v3.831c0 .35-.281.667-.668.667H.669A.668.668 0 0 1 0 23.932V.667C0 .315.282 0 .669 0h4.183Z" />
        </clipPath>
        <clipPath id="z">
          <path d="M15.218 0c.386 0 .667.315.667.667v3.831a.667.667 0 0 1-.667.667H5.483v4.357h8.012c.351 0 .668.317.668.669v3.829a.669.669 0 0 1-.668.669H5.483v4.745h9.735c.386 0 .667.315.667.667v3.831c0 .35-.281.667-.667.667H.669A.668.668 0 0 1 0 23.932V.667C0 .315.282 0 .669 0h14.549Z" />
        </clipPath>
        <clipPath id="A">
          <path d="M11.176 0c4.216 0 7.66 3.408 7.66 7.59 0 3.232-2.143 5.833-5.201 7.063l4.815 8.927c.247.456 0 1.019-.596 1.019h-4.675a.652.652 0 0 1-.563-.317l-4.673-9.313H5.519v8.963c0 .35-.317.667-.668.667H.669A.668.668 0 0 1 0 23.932V.667C0 .316.281 0 .669 0h10.507Zm-.457 5.024h-5.2v5.483h5.2c1.441 0 2.67-1.336 2.67-2.811 0-1.477-1.229-2.672-2.67-2.672Z" />
        </clipPath>
      </defs>
      <g clipPath="url(#a)" transform="translate(-531 -311)">
        <g clipPath="url(#b)" transform="translate(531 348.504)">
          <path fill="#FFF" d="M0 0h88.751v112.922H0V0z" />
        </g>
        <g clipPath="url(#c)" transform="translate(721.106 311.555)">
          <path fill="#FFF" d="M0 0h59.018v149.03H0V0z" />
        </g>
        <g clipPath="url(#d)" transform="translate(766.002 311.555)">
          <path fill="#FFF" d="M0 0h59.018v149.03H0V0z" />
        </g>
        <g clipPath="url(#e)" transform="translate(618.732 348.51)">
          <path fill="#FFF" d="M0 0h105.587v112.071H0V0z" />
        </g>
        <g clipPath="url(#f)" transform="translate(812.438 349.269)">
          <path fill="#FFF" d="M0 0h91.737v111.364H0V0z" />
        </g>
        <g clipPath="url(#g)" transform="translate(874.13 348.511)">
          <path fill="#FFF" d="M0 0h146.245v232.192H0V0z" />
        </g>
        <g clipPath="url(#h)" transform="translate(1160.329 385.17)">
          <path fill="#FFF" d="M0 0h105.785v112.221H0V0z" />
        </g>
        <g clipPath="url(#i)" transform="translate(1262.996 348.517)">
          <path fill="#FFF" d="M0 0h117.024v149.377H0V0z" />
        </g>
        <g clipPath="url(#j)" transform="translate(1035.31 348.517)">
          <path fill="#FFF" d="M0 0h114.373v149.097H0V0z" />
        </g>
        <g clipPath="url(#k)" transform="translate(1265.488 388.164)">
          <path fill="#FFF" d="M.401.177H.6v.646H.401V.177z" />
        </g>
        <g clipPath="url(#l)" transform="translate(1365.618 471.868)">
          <path fill="#FFF" d="M0 0h23.382v26.185H0V0z" />
        </g>
        <g clipPath="url(#m)" transform="translate(992.772 525.401)">
          <path fill="#FFF" d="M0 0h21.431v25.301H0V0z" />
        </g>
        <g clipPath="url(#n)" transform="translate(1018.496 525.401)">
          <path fill="#FFF" d="M0 0h23.685v24.951H0V0z" />
        </g>
        <g clipPath="url(#o)" transform="translate(1048.474 525.402)">
          <path fill="#FFF" d="M0 0h21.154v25.3H0V0z" />
        </g>
        <g clipPath="url(#p)" transform="translate(1079.153 525.402)">
          <path fill="#FFF" d="M0 0h21.155v25.3H0V0z" />
        </g>
        <g clipPath="url(#q)" transform="translate(1106.634 525.401)">
          <path fill="#FFF" d="M0 0h23.685v24.951H0V0z" />
        </g>
        <g clipPath="url(#r)" transform="translate(1136.645 525.753)">
          <path fill="#FFF" d="M0 0h17.044v24.598H0V0z" />
        </g>
        <g clipPath="url(#s)" transform="translate(1161.667 525.753)">
          <path fill="#FFF" d="M0 0h5.554v24.599H0V0z" />
        </g>
        <g clipPath="url(#t)" transform="translate(1175.198 525.402)">
          <path fill="#FFF" d="M0 0h16.552v25.3H0V0z" />
        </g>
        <g clipPath="url(#u)" transform="translate(1210.832 525.753)">
          <path fill="#FFF" d="M0 0h18.836v24.599H0V0z" />
        </g>
        <g clipPath="url(#v)" transform="translate(1237.892 525.753)">
          <path fill="#FFF" d="M0 0h15.884v24.599H0V0z" />
        </g>
        <g clipPath="url(#w)" transform="translate(1259.472 525.753)">
          <path fill="#FFF" d="M0 0h16.938v24.599H0V0z" />
        </g>
        <g clipPath="url(#q)" transform="translate(1278.94 525.401)">
          <path fill="#FFF" d="M0 0h23.685v24.951H0V0z" />
        </g>
        <g clipPath="url(#x)" transform="translate(1308.951 525.753)">
          <path fill="#FFF" d="M0 0h5.554v24.599H0V0z" />
        </g>
        <g clipPath="url(#y)" transform="translate(1324.063 525.753)">
          <path fill="#FFF" d="M0 0h14.55v24.599H0V0z" />
        </g>
        <g clipPath="url(#z)" transform="translate(1345.534 525.753)">
          <path fill="#FFF" d="M0 0h15.885v24.599H0V0z" />
        </g>
        <g clipPath="url(#A)" transform="translate(1369.642 525.753)">
          <path fill="#FFF" d="M0 0h18.836v24.599H0V0z" />
        </g>
      </g>
    </StyledSvg>
  );
}

const StyledSvg = styled.svg`
  cursor: ${({ onClick }) => (onClick ? "pointer" : "auto")};
  max-width: 100%;
`;
