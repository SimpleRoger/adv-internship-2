import { BsStarFill } from "react-icons/bs";

function Reviews() {
  return (
    <div class="row">
      <div class="container">
        <div class="section__title">What our members say</div>
        <div class="reviews__wrapper">
          <div class="review">
            <div class="review__header">
              <div class="review__name">Hanna M.</div>
              <div class="review__stars">
                <BsStarFill />
              </div>
            </div>
            <div class="review__body">
              This app has been a <b>game-changer</b> for me! It's saved me so
              much time and effort in reading and comprehending books. Highly
              recommend it to all book lovers.
            </div>
          </div>
          <div class="review">
            <div class="review__header">
              <div class="review__name">David B.</div>
              <div class="review__stars">
                <BsStarFill />
              </div>
            </div>
            <div class="review__body">
              I love this app! It provides
              <b>concise and accurate summaries</b> of books in a way that is
              easy to understand. It's also very user-friendly and intuitive.
            </div>
          </div>
          <div class="review">
            <div class="review__header">
              <div class="review__name">Nathan S.</div>
              <div class="review__stars">
                <BsStarFill />
              </div>
            </div>
            <div class="review__body">
              This app is a great way to get the main takeaways from a book
              without having to read the entire thing.
              <b>The summaries are well-written and informative.</b>
              Definitely worth downloading.
            </div>
          </div>
          <div class="review">
            <div class="review__header">
              <div class="review__name">Ryan R.</div>
              <div class="review__stars">
                <BsStarFill />
              </div>
            </div>
            <div class="review__body">
              If you're a busy person who
              <b>loves reading but doesn't have the time</b> to read every book
              in full, this app is for you! The summaries are thorough and
              provide a great overview of the book's content.
            </div>
          </div>
        </div>
        <div class="reviews__btn--wrapper">
          <button class="btn home__cta--btn">Login</button>
        </div>
      </div>
    </div>
  );
}

export default Reviews;
