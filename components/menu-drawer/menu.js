
        const menuDrawer = document.getElementById("menuDrawer");
        const menuOpen = document.getElementById("menuOpen");
        const drawerClose = document.getElementById("drawerClose");
        const drawerOverlay =  document.getElementById("drawerOverlay");
        // Open drawer


        menuOpen.addEventListener("click", ()=> {


            menuDrawer.classList.add("open");


            drawerOverlay.classList.add("show");


        });




        // Close drawer


        drawerClose.addEventListener("click",  ()=> {


            closeDrawer();


        });




        // Close when overlay is clicked


        drawerOverlay.addEventListener("click",  ()=> {


            closeDrawer();


        });




        // Close drawer function


        function closeDrawer() {
            menuDrawer.classList.remove("open");
            drawerOverlay.classList.remove("show");
        }




        // Close drawer with Escape key


        document.addEventListener("keydown",event=> {
            if (event.key === "Escape") {
                closeDrawer();
            }
        });




        // Close drawer after selecting a page on mobile


const menuItems = document.querySelectorAll(".menu-item");
menuItems[0].classList.remove("active");
menuItems.forEach(item => {
            item.addEventListener("click",  ()=> {
                if (window.innerWidth < 900) {
                    closeDrawer();
                }
            });


});
        

function link_tabs (drawerContainer) {
    const currentPage = window.location.pathname.split("/").pop();
const drawerLinks = document.querySelectorAll(`${drawerContainer} a`);
drawerLinks.forEach(link => {
    const linkedPage = link.getAttribute("href").split("/").pop();

    if (currentPage === linkedPage) {
        link.classList.add("active");
        // console.log(linkedPage);
    }
   
});
}
link_tabs('aside')
link_tabs('.quick-menu-content')

//console.log("")
// active page / activation 









        // Example sign-out action


        const signOut =  document.getElementById("signOut");
        signOut.addEventListener("click",  ()=> {
            alert("Sign out action will be connected later.");
        });
    




























const quickMenuButton = document.getElementById("quickMenuButton");

    const quickMenuContent = document.getElementById("quickMenuContent");

    const quickSignOut =  document.getElementById("quickSignOut");


    // Open / close quick menu

    quickMenuButton.addEventListener("click",  event=> {

        event.stopPropagation();

        const isOpen =
            quickMenuContent.classList.toggle("show");

        quickMenuButton.setAttribute(
            "aria-expanded",
            isOpen
        );

    });


    // Close when clicking outside

    document.addEventListener("click", ()=> {

        quickMenuContent.classList.remove("show");

        quickMenuButton.setAttribute(
            "aria-expanded",
            "false"
        );

    });


    // Prevent clicks inside menu from closing it immediately

    quickMenuContent.addEventListener(
        "click",
         event=>{

            event.stopPropagation();

        }
    );


    // Close with Escape

    document.addEventListener(
        "keydown",
        event=> {

            if (event.key === "Escape") {

                quickMenuContent.classList.remove("show");

                quickMenuButton.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }

        }
    );


    // Temporary sign-out action

    quickSignOut.addEventListener(
        "click",
         ()=> {

            alert(
                "Sign out will be connected to authentication later."
            );

        }
    );
