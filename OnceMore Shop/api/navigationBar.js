const navbar = `
   <!-- CTO top -->
             <section class="top-txt w-full h-[40%] bg-gray-800 flex py-3">
                <div class="maxContainer flex justify-between items-center">
                    <div class="sm:w-[60%] w-[55%] md:w-[380px] head-txt text-lightGray font-bold">
                        <p class="text-[11px] sm:text-[16px]">Free shipping, 30-day return or refund guarantee.</p>
                    </div>
                    <div class="sign-in-up text-[12px] sm:text-[16px] text-blue-700 font-bold flex gap-3 sm:gap-6">
                        <a href="#">SIGN IN</a>
                        <a href="#">SIGN UP</a>
                    </div>
                </div>
            </section>

            <!-- Navigation Bar -->
            <div class="maxContainer py-3 h-[60%] flex justify-between gap-4 items-center">
                <!-- Left Part -->
                <div>
                    <a href="index.html">
                        <img src="assets/text_logo.png" alt="OnceMore Shop" width="150px" class="logo">
                    </a>
                </div>

                <!-- Right Part -->
                <div>
                    <ul class="flex gap-3 items-center">
                        <li class="hidden md:block">
                            <a href="index.html" class="group relative hover:text-lightBlue500">Home
                                <div
                                    class="h-[2px] bg-lightBlue500 absolute bottom-[-1] left-0 w-0 transition-all duration-300 group-hover:w-full">
                                </div>
                            </a>
                        </li>

                        <li class="hidden md:block">
                            <a href="about.html" class="group relative hover:text-lightBlue500">About
                                <div
                                    class="h-[2px] bg-lightBlue500 absolute bottom-[-1] left-0 w-0 transition-all duration-300 group-hover:w-full">
                                </div>
                            </a>
                        </li>

                        <li class="hidden md:block">
                            <a href="products.html" class="group relative hover:text-lightBlue500">Products
                                <div
                                    class="h-[2px] bg-lightBlue500 absolute bottom-[-1] left-0 w-0 transition-all duration-300 group-hover:w-full">
                                </div>
                            </a>
                        </li>

                        <li class="hidden md:block">
                            <a href="contact.html" class="group relative hover:text-lightBlue500">Contact
                                <div
                                    class="h-[2px] bg-lightBlue500 absolute bottom-[-1] left-0 w-0 transition-all duration-300 group-hover:w-full">
                                </div>
                            </a>
                        </li>

                        <li class="block md:hidden">
                            <nav uk-dropnav>
                                <ul class="uk-subnav">
                                    <li>
                                        <a href>Menu <span uk-drop-parent-icon></span></a>
                                        <div class="uk-dropdown">
                                            <ul class="uk-nav uk-dropdown-nav">
                                                <li>
                                                    <a href="index.html" class="group relative hover:text-lightBlue500">Home
                                                    </a>
                                                </li>

                                                <li>
                                                    <a href="about.html"
                                                        class="group relative hover:text-lightBlue500">About
                                                    </a>
                                                </li>

                                                <li>
                                                    <a href="products.html" class="group relative hover:text-lightBlue500">Products
                                                    </a>
                                                </li>

                                                <li>
                                                    <a href="contact.html" class="group relative hover:text-lightBlue500">Contact
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </li>
                                </ul>
                            </nav>
                        </li>
                        <li class="bg-gray-700 text-white rounded-md py-2 px-5 ml-4 cursor-pointer group">
                            <a href="addToCart.html" class="flex items-center gap-4 group-hover:text-white" id="cartValue">
                                <i class="fa-solid fa-cart-shopping text-sm"></i>
                                <p class="headerCartButton">0</p>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>`;

let navSection = document.querySelector("#section-navbar");
navSection.innerHTML = navbar;