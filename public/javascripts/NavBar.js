export default {
  props: {
    iconUrl:'',
    links: [],
  },
  methods: {
    logOut : function () {
      fetch("/users/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams()
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("POST attempt to /logout was not OK");
          }
          return response.json();
        })
        .then((data) => {
         
          window.location.href = data.redirectUrl;
          
        })
        .catch((error) => {
          console.error("Users POST error:", error);
        });
    }
  },
  template: `
  <nav class="navbar navbar-expand-md navbar-dark bg-secondary">
    <div class="container-fluid">
      <a class="navbar-brand pt-1 pl-2" href="#" disabled>
        <img :src="iconUrl" alt="" height="30" />
      </a>

      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">

        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item mx-1" v-for="link in links">
            <a :href="link.url" style="color: white;">{{link.name}}</a>
          </li>
        </ul>

        <div class="navbar-nav me-auto m-2"></div>

        <button class="btn btn-light" type="button" @click="logOut">Log Out</button>

      </div>
    </div>
  </nav>
  `
}