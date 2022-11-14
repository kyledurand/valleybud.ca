import styled from "styled-components";

interface CartIconProps {
  height?: number;
  width?: number;
  isDark?: boolean;
  className?: string;
  onClick?: () => void;
}

export function CartIcon(props: CartIconProps): JSX.Element {
  const { height = 23, width = 23, className = "", onClick } = props;
  const color = "var(--text)";
  return (
    <StyledSvg
      width={width}
      height={height}
      className={className}
      viewBox="0 0 23 23"
      fill={color}
      onClick={onClick}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M8.86123 17.1923C7.25985 17.1923 5.95703 18.4951 5.95703 20.0965C5.95703 21.6978 7.25985 23.0007 8.86123 23.0007C10.4626 23.0007 11.7654 21.6978 11.7654 20.0965C11.7654 18.4951 10.4626 17.1923 8.86123 17.1923ZM8.86123 21.2581C8.22056 21.2581 7.69957 20.7371 7.69957 20.0965C7.69957 19.4558 8.22056 18.9348 8.86123 18.9348C9.50159 18.9348 10.0229 19.4558 10.0229 20.0965C10.0229 20.7371 9.5019 21.2581 8.86123 21.2581Z" />
      <path d="M17.4569 17.1923C15.8556 17.1923 14.5527 18.4951 14.5527 20.0965C14.5527 21.6978 15.8556 23.0007 17.4569 23.0007C19.0583 23.0007 20.3611 21.6978 20.3611 20.0965C20.3611 18.4951 19.0583 17.1923 17.4569 17.1923ZM17.4569 21.2581C16.8163 21.2581 16.2953 20.7371 16.2953 20.0965C16.2953 19.4558 16.8163 18.9348 17.4569 18.9348C18.0976 18.9348 18.6186 19.4558 18.6186 20.0965C18.6186 20.7371 18.0976 21.2581 17.4569 21.2581Z" />
      <path d="M22.4954 5.67185C22.3299 5.4639 22.079 5.34282 21.8135 5.34282H6.55787L5.7659 1.34026C5.69649 0.989712 5.42002 0.717019 5.06831 0.652552L1.58327 0.0136328C1.10905 -0.0737907 0.655983 0.240188 0.569143 0.71356C0.482304 1.18693 0.795653 1.64085 1.26907 1.72769L4.17152 2.25973L6.72836 15.1831C6.80909 15.5911 7.16719 15.8853 7.58306 15.8853H19.7806C20.1864 15.8853 20.5381 15.6056 20.6295 15.2098L22.6625 6.4101C22.7223 6.15133 22.6607 5.8795 22.4954 5.67185ZM19.0877 14.1428H8.29862L6.90258 7.08563H20.7178L19.0877 14.1428Z" />
    </StyledSvg>
  );
}

const StyledSvg = styled.svg`
  cursor: ${({ onClick }) => (onClick ? "pointer" : "auto")};
`;
