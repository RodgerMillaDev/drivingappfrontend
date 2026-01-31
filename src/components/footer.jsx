function Footer(){
    return (
        <footer>
            <div className="footerPlacer">
                <div className="footerTop">
                    <div className="fLogo">
                        <h3>NDDA</h3>
                    </div>
                    <div className="footerLinks">
                        <div className="flLeft">
                            <div className="fLinkTitle">
                                <p>Menu Links</p>
                            </div>
                            <div className="flmLinks">
                                     <p>Home</p>
                            <p>My Certificate</p>
                            <p>Course Modules</p>
                                </div>

                       



                        </div>
                        <div className="flRight">
                            <div className="fLinkTitle">
                                <p>Navigation</p>
                            </div>
                            <div className="flmLinks">
 <p>About Us</p>
                            <p>Feedback</p>
                            <p>Contact Support</p>
                            </div>
                           

                        </div>

                    </div>
                    <div className="footerNewsletter">
 <div className="fLinkTitle">
                                <p>Subsribe for Updates</p>
                            </div>
                            <p className="ltItron">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo, cumque?</p>
                            <div className="fnInputWrap">
                                <div className="finput">
                                    <input type="text" placeholder="Enter email"/>
                                </div>
                                <div className="finputBtn">
                                     <p>Send</p>
                                </div>
                            </div>


                    </div>

                </div>
                <div className="footerBtm">
                    <span>
                       &copy; 2026 NDDA. All Rights Reserved. 
                    </span>
                
                </div>
            </div>

        </footer>
    )

}
export default Footer;