import { openLogInModal } from "@/redux/modalSlice";
import Image from "next/image";
import { useDispatch } from "react-redux";

function Navbar1() {
  const dispatch = useDispatch();

  return (
    <>
      <div class="nav__wrapper">
        <figure class="nav__img--mask">
          <Image
            class="nav__img"
            src="/assets/logo.png"
            width={300}
            height={300}
            alt="logo"
          />
        </figure>
        <ul class="nav__list--wrapper">
          <li
            class="nav__list nav__list--login"
            onClick={(e) => {
              e.stopPropagation();
              dispatch(openLogInModal());
            }}
          >
            Login
          </li>
          <li class="nav__list nav__list--mobile">About</li>
          <li class="nav__list nav__list--mobile">Contact</li>
          <li class="nav__list nav__list--mobile">Help</li>
        </ul>
      </div>
    </>
  );
}
export default Navbar1;
