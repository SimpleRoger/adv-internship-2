import Image from "next/image";
import { AiFillAudio, AiFillBulb, AiFillFileText } from "react-icons/ai";

function Features() {
  return (
    <div class="container">
      <div class="row">
        <div class="section__title">Understand books in few minutes</div>
        <div class="features__wrapper">
          <div class="features">
            <div class="features__icon">
              <AiFillFileText />
            </div>
            <div class="features__title">Read or listen</div>
            <div class="features__sub--title">
              Save time by getting the core ideas from the best books.
            </div>
          </div>
          <div class="features">
            <div class="features__icon">
              <AiFillBulb />
            </div>
            <div class="features__title">Find your next read</div>
            <div class="features__sub--title">
              Explore book lists and personalized recommendations.
            </div>
          </div>
          <div class="features">
            <div class="features__icon">
              <AiFillAudio />
            </div>
            <div class="features__title">Briefcasts</div>
            <div class="features__sub--title">
              Gain valuable insights from briefcasts
            </div>
          </div>
        </div>
        <div class="statistics__wrapper">
          <div class="statistics__content--header">
            <div class="statistics__heading">Enhance your knowledge</div>
            <div class="statistics__heading">Achieve greater success</div>
            <div class="statistics__heading">Improve your health</div>
            <div class="statistics__heading">
              Develop better parenting skills
            </div>
            <div class="statistics__heading">Increase happiness</div>
            <div class="statistics__heading">
              Be the best version of yourself!
            </div>
          </div>
          <div class="statistics__content--details">
            <div class="statistics__data">
              <div class="statistics__data--number">93%</div>
              <div class="statistics__data--title">
                of Summarist members <b>significantly increase</b> reading
                frequency.
              </div>
            </div>
            <div class="statistics__data">
              <div class="statistics__data--number">96%</div>
              <div class="statistics__data--title">
                of Summarist members <b>establish better</b> habits.
              </div>
            </div>
            <div class="statistics__data">
              <div class="statistics__data--number">90%</div>
              <div class="statistics__data--title">
                have made <b>significant positive</b> change to their lives.
              </div>
            </div>
          </div>
        </div>
        <div class="statistics__wrapper">
          <div class="statistics__content--details statistics__content--details-second">
            <div class="statistics__data">
              <div class="statistics__data--number">91%</div>
              <div class="statistics__data--title">
                of Summarist members <b>report feeling more productive</b> after
                incorporating the service into their daily routine.
              </div>
            </div>
            <div class="statistics__data">
              <div class="statistics__data--number">94%</div>
              <div class="statistics__data--title">
                of Summarist members have <b>noticed an improvement</b> in their
                overall comprehension and retention of information.
              </div>
            </div>
            <div class="statistics__data">
              <div class="statistics__data--number">88%</div>
              <div class="statistics__data--title">
                of Summarist members <b>feel more informed</b> about current
                events and industry trends since using the platform.
              </div>
            </div>
          </div>
          <div class="statistics__content--header statistics__content--header-second">
            <div class="statistics__heading">Expand your learning</div>
            <div class="statistics__heading">Accomplish your goals</div>
            <div class="statistics__heading">Strengthen your vitality</div>
            <div class="statistics__heading">Become a better caregiver</div>
            <div class="statistics__heading">Improve your mood</div>
            <div class="statistics__heading">Maximize your abilities</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Features;
