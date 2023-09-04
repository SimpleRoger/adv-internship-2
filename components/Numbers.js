import { BsStarFill, BsStarHalf} from "react-icons/bs";
import { RiLeafLine } from "react-icons/ri";
import { BiCrown } from "react-icons/bi";


function Numbers() {
  return (
    <div class="container">
      <div class="row">
        <div class="section__title">Start growing with Summarist now</div>
        <div class="numbers__wrapper">
          <div class="numbers">
            <div class="numbers__icon">
              <BiCrown />
            </div>
            <div class="numbers__title">3 Million</div>
            <div class="numbers__sub--title">Downloads on all platforms</div>
          </div>
          <div class="numbers">
            <div class="numbers__icon numbers__star--icon">
              <BsStarFill />
              <BsStarHalf />
            </div>
            <div class="numbers__title">4.5 Stars</div>
            <div class="numbers__sub--title">
              Average ratings on iOS and Google Play
            </div>
          </div>
          <div class="numbers">
            <div class="numbers__icon">
              <RiLeafLine />
            </div>
            <div class="numbers__title">97%</div>
            <div class="numbers__sub--title">
              Of Summarist members create a better reading habit
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Numbers;
