import Image from 'next/image'


function Navbar1() {
  return (
    <>
      <div class="nav__wrapper">
        <figure class="nav__img--mask">
          <Image class="nav__img" src="/assets/logo.png" width={300} height = {300} alt="logo" />
        </figure>
        <ul class="nav__list--wrapper">
          <li class="nav__list nav__list--login">Login</li>
          <li class="nav__list nav__list--mobile">About</li>
          <li class="nav__list nav__list--mobile">Contact</li>
          <li class="nav__list nav__list--mobile">Help</li>
        </ul>
      </div>
    </>
  );
}
export default Navbar1
