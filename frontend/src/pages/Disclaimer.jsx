import React from "react";
import "../styles/policy.css";

const Disclaimer = () => {
    return (
        <div className="policy-page">

            <div className="policy-hero">
                <h1>Disclaimer</h1>
                <p>Last updated: 2026</p>
            </div>

            <div className="policy-container">

                <section>
                    <h2>General Information</h2>
                    <p>
                        The information provided by ShopNest on this website is for general 
                        informational purposes only. All information is provided in good faith, 
                        however we make no representation or warranty of any kind regarding 
                        the accuracy, adequacy, validity, reliability, availability, or completeness 
                        of any information on the site.
                    </p>
                </section>

                <section>
                    <h2>External Links Disclaimer</h2>
                    <p>
                        Our website may contain links to third-party websites. We do not monitor 
                        or guarantee the accuracy or reliability of any information offered by 
                        third-party websites.
                    </p>
                </section>

                <section>
                    <h2>Product Disclaimer</h2>
                    <p>
                        All products sold on ShopNest are provided "as is" without warranties 
                        of any kind, either express or implied. We do not guarantee that 
                        product descriptions, images, or other content are error-free.
                    </p>
                </section>

                <section>
                    <h2>Limitation of Liability</h2>
                    <p>
                        Under no circumstance shall we be held liable for any loss or damage 
                        incurred as a result of the use of the site or reliance on any 
                        information provided on the site.
                    </p>
                </section>

                <section>
                    <h2>Contact Us</h2>
                    <p>
                        If you have any questions about this Disclaimer, you can contact us at:
                    </p>
                    <p>
                        📧 <a href="mailto:support@shopnest.com">support@shopnest.com</a>
                    </p>
                </section>

            </div>
        </div>
    );
};

export default Disclaimer;