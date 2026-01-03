import { Link } from "react-router-dom";
import { PlanOffer } from "../../assets/images";
import styles from "./plan.module.scss";

export const ChoosePlan = () => {
  return (
    <div className={styles.choosePlanContainer}>
      <div className={styles.bg}>
        <div className={styles.intro}>
          <div className={styles.text}>
            Dzięki nam dotrzesz skutecznie do społeczności ponad 200 tysięcy
            polskich programistów.
          </div>
          <img className={styles.program} src={PlanOffer} alt="programming" />
        </div>
      </div>
      <div className={styles.cards}>
        <h1 className={styles.h1offer}>Poznaj ogłoszenia na Just Join IT</h1>
        <div className={styles.priceTable}>
          <div className={styles.paddingLeft}>
            <div className={styles.package}>
              <div className={styles.header}>
                <div className={styles.title}>Basic</div>
                <div className={styles.price}>
                  <span className={styles.pricetxt}>390</span>
                  <span className={styles.pricecurr}>PLN</span>
                </div>
              </div>
              <div className={styles.description}>
                <ul className={styles.benefits}>
                  <li className={styles.point}>
                    <div className={styles.iconActive}>
                      <span
                        className={`lnr lnr-checkmark-circle ${styles.spanLine}`}
                      />
                    </div>
                    Ogłoszenie w prasówce technologicznej
                  </li>
                  <li className={styles.point}>
                    <div className={styles.iconNotActive}>
                      <span
                        className={`lnr lnr-circle-minus ${styles.spanLine}`}
                      />
                    </div>
                    Brak Customer Care
                  </li>
                  <li className={styles.point}>
                    <div className={styles.iconNotActive}>
                      <span
                        className={`lnr lnr-circle-minus ${styles.spanLine}`}
                      />
                    </div>
                    Bez odświeżeń
                  </li>
                  <li className={styles.point}>
                    <div className={styles.iconNotActive}>
                      <span
                        className={`lnr lnr-circle-minus ${styles.spanLine}`}
                      />
                    </div>
                    Brak promocji w Social Media
                  </li>
                  <li className={styles.point}>
                    <div className={styles.iconNotActive}>
                      <span
                        className={`lnr lnr-circle-minus ${styles.spanLine}`}
                      />
                    </div>
                    Brak indywidualnego copy
                  </li>
                  <li className={styles.point}>
                    <div className={styles.iconNotActive}>
                      <span
                        className={`lnr lnr-circle-minus ${styles.spanLine}`}
                      />
                    </div>
                    Brak Social Boost - płatna kampania marketingowa w social
                    media na budżecie klienta
                  </li>
                </ul>
                <Link className={styles.linkStyle} to={"/add/basic"}>
                  <div className={styles.btn}>Kup ogłoszenie</div>
                </Link>
              </div>
            </div>
          </div>
          <div className={styles.paddingRight}>
            <div className={styles.packageMiddle}>
              <div className={styles.recom}>Najczęściej wybierany</div>
              <div className={styles.header}>
                <div className={styles.title}>Premium</div>
                <div className={styles.price}>
                  <span className={styles.pricetxt}>490</span>
                  <span className={styles.pricecurr}>PLN</span>
                </div>
              </div>
              <div className={styles.description}>
                <ul className={styles.benefits}>
                  <li className={styles.point}>
                    <div className={styles.iconActive}>
                      <span
                        className={`lnr lnr-checkmark-circle ${styles.spanLine}`}
                      />
                    </div>
                    Ogłoszenie w prasówce technologicznej
                  </li>
                  <li className={styles.point}>
                    <div className={styles.iconActive}>
                      <span
                        className={`lnr lnr-checkmark-circle ${styles.spanLine}`}
                      />
                    </div>
                    Dedykowany opiekun Customer Care
                  </li>
                  <li className={styles.point}>
                    <div className={styles.iconActive}>
                      <span
                        className={`lnr lnr-checkmark-circle ${styles.spanLine}`}
                      />
                    </div>
                    1 automatyczne odświeżenie
                  </li>
                  <li className={styles.point}>
                    <div className={styles.iconNotActive}>
                      <span
                        className={`lnr lnr-circle-minus ${styles.spanLine}`}
                      />
                    </div>
                    Brak promocji w Social Media
                  </li>
                  <li className={styles.point}>
                    <div className={styles.iconNotActive}>
                      <span
                        className={`lnr lnr-circle-minus ${styles.spanLine}`}
                      />
                    </div>
                    Brak indywidualnego copy
                  </li>
                  <li className={styles.point}>
                    <div className={styles.iconNotActive}>
                      <span
                        className={`lnr lnr-circle-minus ${styles.spanLine}`}
                      />
                    </div>
                    Brak Social Boost - płatna kampania marketingowa w social
                    media na budżecie klienta
                  </li>
                </ul>
                <Link className={styles.linkStyle} to={"/add/premium"}>
                  <div className={styles.btn}>Kup ogłoszenie</div>
                </Link>
              </div>
            </div>
          </div>
          <div className={styles.paddingRight30}>
            <div className={styles.package}>
              <div className={styles.header}>
                <div className={styles.title}>Business</div>
                <div className={styles.price}>
                  <span className={styles.pricetxt}>790</span>
                  <span className={styles.pricecurr}>PLN</span>
                </div>
              </div>
              <div className={styles.description}>
                <ul className={styles.benefits}>
                  <li className={styles.point}>
                    <div className={styles.iconActive}>
                      <span
                        className={`lnr lnr-checkmark-circle ${styles.spanLine}`}
                      />
                    </div>
                    Ogłoszenie w prasówce technologicznej
                  </li>
                  <li className={styles.point}>
                    <div className={styles.iconActive}>
                      <span
                        className={`lnr lnr-checkmark-circle ${styles.spanLine}`}
                      />
                    </div>
                    Dedykowany opiekun Customer Care
                  </li>
                  <li className={styles.point}>
                    <div className={styles.iconActive}>
                      <span
                        className={`lnr lnr-checkmark-circle ${styles.spanLine}`}
                      />
                    </div>
                    2 automatyczne odświeżenia
                  </li>
                  <li className={styles.point}>
                    <div className={styles.iconActive}>
                      <span
                        className={`lnr lnr-checkmark-circle ${styles.spanLine}`}
                      />
                    </div>
                    Indywidualna promocja w Social Media
                  </li>
                  <li className={styles.point}>
                    <div className={styles.iconActive}>
                      <span
                        className={`lnr lnr-checkmark-circle ${styles.spanLine}`}
                      />
                    </div>
                    Indywidualne copy ogłoszenia + audyt
                  </li>
                  <li className={styles.point}>
                    <div className={styles.iconActive}>
                      <span
                        className={`lnr lnr-checkmark-circle ${styles.spanLine}`}
                      />
                    </div>
                    Możliwy Social Boost - płatna kampania marketingowa w social
                    media na budżecie klienta
                  </li>
                </ul>
                <Link className={styles.linkStyle} to={"/add/business"}>
                  <div className={styles.btn}>Kup ogłoszenie</div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
