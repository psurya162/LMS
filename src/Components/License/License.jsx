import React from "react";

const License = () => {
  return (
    <>
      <main className="main_wrapper">
        {/* dashboardarea__area__start  */}
        <div className="dashboardarea ">
          <div className="dashboard">
            <div className="container-fluid full__width__padding">
              <div className="row">
                <div className="col-xl-12 col-lg-12 col-md-12">
                  <div >
                    <div className="dashboard__section__title">
                      <h4>License apply</h4>
                    </div>
                    <div className="row">
                      <div className="col-xl-12">
                        <div className="row">
                          <div className="col-xl-4">
                            <div className="dashboard__form__wraper">
                              <div className="dashboard__form__input">
                                <label>
                                  Full Name{" "}
                                  <span className="text-danger">*</span>
                                </label>
                                <input type="text" />
                              </div>
                            </div>
                          </div>
                          <div className="col-xl-4">
                            <div className="dashboard__form__wraper">
                              <div className="dashboard__form__input">
                                <label>
                                  Email <span className="text-danger">*</span>
                                </label>
                                <input type="email" />
                              </div>
                            </div>
                          </div>
                          <div className="col-xl-4">
                            <div className="dashboard__form__wraper">
                              <div className="dashboard__form__input">
                                <label>
                                  Mobile <span className="text-danger">*</span>
                                </label>
                                <input type="tel" />
                              </div>
                            </div>
                          </div>
                          <div className="col-xl-4">
                            <div className="dashboard__form__wraper">
                              <div className="dashboard__form__input">
                                <label>
                                  Organization{" "}
                                  <span className="text-danger">*</span>
                                </label>
                                <input type="text" />
                              </div>
                            </div>
                          </div>
                          <div className="col-xl-4">
                            <div className="dashboard__form__wraper">
                              <div className="dashboard__form__input">
                                <label>
                                  Content <span className="text-danger">*</span>
                                </label>
                                <input type="text" />
                              </div>
                            </div>
                          </div>
                          <div className="col-xl-4">
                            <div className="dashboard__form__wraper">
                              <div className="dashboard__form__input">
                                <label>
                                  Board <span className="text-danger">*</span>
                                </label>
                                <input type="text" />
                              </div>
                            </div>
                          </div>
                          <div className="col-xl-4">
                            <div className="dashboard__form__wraper">
                              <div className="dashboard__form__input">
                                <label>
                                  Medium <span className="text-danger">*</span>
                                </label>
                                <select>
                                  <option selected="" disabled="">
                                    Select{" "}
                                  </option>
                                  <option value={1}>Hindi</option>
                                  <option value={2}>English</option>
                                </select>
                              </div>
                            </div>
                          </div>
                          <div className="col-xl-4">
                            <div className="dashboard__form__wraper">
                              <div className="dashboard__form__input">
                                <label>
                                  Duration{" "}
                                  <span className="text-danger">*</span>
                                </label>
                                <input type="text" />
                              </div>
                            </div>
                          </div>
                          <div className="col-xl-12">
                            <div className="dashboard__form__button">
                              <a className="default__button" href="#">
                                Submit
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* dashboardarea__area__end   */}
      </main>
    </>
  );
};

export default License;
