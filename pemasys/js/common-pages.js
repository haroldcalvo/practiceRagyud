
const entity = `<img class="subscriber_logo" style="max-width:260px;max-height:75px;"/>`;

//HEADER MOBILE
const header_mobile_div = document.getElementById('menuTopBarContent');
header_mobile_div.innerHTML = `<div class="header-mobile__bar">
                                <div class="container-fluid">
                                    <div class="header-mobile-inner">
                                        <a class="logo" onclick="logoutToPortal(1)">
                                            ${entity}
                                        </a>
                                        <button class="hamburger hamburger--slider" type="button">
                                            <span class="hamburger-box">
                                                <span class="hamburger-inner"></span>
                                            </span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <nav class="navbar-mobile">
                                <div id="top-bar-list-grp-functions" class="container-fluid">
                                    <ul class="navbar-mobile__list list-unstyled"></ul>
                                </div>
                            </nav>`;
//MENU SIDEBAR
const menu_side_div = document.getElementById('menuSideBarContent');
menu_side_div.innerHTML = `<div class="logo">
                            <a onclick="logoutToPortal(1)" style="display: block;margin-left: auto;margin-right: auto;">
                                ${entity}
                            </a>
                        </div>
                        <div class="menu-sidebar__content js-scrollbar1">
                            <nav id="side-bar-list-grp-functions" class="navbar-sidebar">
                                <ul class="list-unstyled navbar__list"></ul>
                            </nav>
                        </div>`;
const page_content_div = document.getElementById('headerDesktopContent');
page_content_div.innerHTML = `<div class="section__content section__content--p30">
                                <div class="container-fluid">
                                    <div class="header-wrap">
                                        <div class="logo-container" style="display: flex; justify-content: center; align-items: center; width: 85%;height: 50%;">
                                            <div class="logo">
                                                <img id="application_image_logo" style="width:179px; height:90px"/>
                                            </div>
                                        </div>
                                        <div class="header-button">
                                        
                                            <div class="account-wrap">
                                                <div class="account-item clearfix js-item-menu">
                                                    <div class="image">
                                                        <img src="../template/images/icon/avatar-01.jpg" alt="John Doe" style="border-radius: 50%;"/>
                                                    </div>
                                                    <div class="content">
                                                        <a class="js-acc-btn" href=""><span class="welcome-username"></a>
                                                    </div>
                                                    <div class="account-dropdown js-dropdown">
                                                        <div class="info clearfix">
                                                            <div class="image">
                                                                <a href="">
                                                                    <img src="../template/images/icon/avatar-01.jpg" alt="John Doe" style="border-radius: 50%;"/>
                                                                </a>
                                                            </div>
                                                            <div class="content">
                                                                <h5 class="name">
                                                                    <a href=""><span class="welcome-username"></span></a>
                                                                </h5>
                                                                <span class="email welcome-useremail"></span>
                                                            </div>
                                                        </div>
                                                        <div class="account-dropdown__body">
                                                            <div class="account-dropdown__item">
                                                                <a href="">
                                                                    <i class="zmdi zmdi-account"></i>Account</a>
                                                            </div>
                                                            <div class="account-dropdown__item">
                                                                <a href="">
                                                                    <i class="fa fa-gears"></i>Setting</a>
                                                            </div>
                                                            <!-- <div class="account-dropdown__item">
                                                                <a href="">
                                                                    <i class="zmdi zmdi-money-box"></i>Billing</a>
                                                            </div> -->
                                                        </div>
                                                        <div class="account-dropdown__footer">
                                                            <a onclick="logoutToPortal(1)">
                                                                <i class="zmdi zmdi-power"></i>Logout</a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>`;
