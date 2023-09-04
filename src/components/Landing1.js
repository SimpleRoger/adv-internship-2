import Image from "next/image";
import { useDispatch } from "react-redux";
import { openCommentModal, openLogInModal } from "@/redux/modalSlice";
function Landing1() {
  const dispatch = useDispatch();

  return (
    <div class="container">
      <div class="row">
        <div class="landing__wrapper">
          <div class="landing__content">
            <div class="landing__content__title">
              Gain more knowledge <br class="remove--tablet" />
              in less time
            </div>
            <div class="landing__content__subtitle">
              Great summaries for busy people,
              <br class="remove--tablet" />
              individuals who barely have time to read,
              <br class="remove--tablet" />
              and even people who don’t like to read.
            </div>
            <button
              class="btn home__cta--btn"
              onClick={(e) => {
                e.stopPropagation();
                dispatch(openLogInModal());
              }}
            >
              Login
            </button>
          </div>
          <figure class="landing__image--mask">
            <Image
              src="/assets/landing.png"
              width={500}
              height={500}
              alt="landing"
            />
          </figure>
        </div>
      </div>
    </div>
  );
}

export default Landing1;
