import { Movie } from "./movie.model";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Filter, Pagination } from "./configClasses.repository";
import { Studio } from "./studio.model";
import { Order } from "./order.model";

const studiosUrl = "/api/studios";
const moviesUrl = "/api/movies";
const sessionUrl = "/api/session";
const ordersUrl = "/api/orders";

@Injectable()
export class Repository {
  private filterObject = new Filter();
  private paginationObject = new Pagination();

  movie: Movie;
  movies: Movie[];
  studios: Studio[] = [];
  orders: Order[] = [];
  categories: string[] = [];

  constructor(private http: HttpClient) {
    this.filter.related = true;
    this.getMovies(true);
  }

  getMovie(id: number) {
    this.http.get(moviesUrl + "/" + id).subscribe((response) => {
      this.movie = response;
    });
  }

  getMovies(related = false) {
    let url = moviesUrl + "?related=" + this.filter.related;
    if (this.filter.category) {
      url += "&category=" + this.filter.category;
    }
    if (this.filter.search) {
      url += "&search=" + this.filter.search;
    }

    url += "&metadata=true";

    this.http.get<any>(url).subscribe((response) => {
      this.movies = response.data;
      this.categories = response.categories;
      this.pagination.currentPage = 1;
    });
  }

  getStudios() {
    this.http
      .get<Studio[]>(studiosUrl)
      .subscribe((response) => (this.studios = response));
  }

  createMovie(mov: Movie) {
    let data = {
      Image: mov.image,
      name: mov.name,
      category: mov.category,
      description: mov.description,
      price: mov.price,
      studio: mov.studio ? mov.studio.studioId : 0,
    };
    this.http.post<number>(moviesUrl, data).subscribe((response) => {
      mov.movieId = response;
      this.movies.push(mov);
    });
  }

  createMovieAndStudio(mov: Movie, stu: Studio) {
    let data = {
      name: stu.name,
      city: stu.city,
      state: stu.state,
    };
    this.http.post<number>(studiosUrl, data).subscribe((response) => {
      stu.studioId = response;
      mov.studio = stu;
      this.studios.push(stu);
      if (mov != null) {
        this.createMovie(mov);
      }
    });
  }

  replaceMovie(mov: Movie) {
    let data = {
      image: mov.image,
      name: mov.name,
      category: mov.category,
      description: mov.description,
      price: mov.price,
      studio: mov.studio ? mov.studio.studioId : 0,
    };
    this.http
      .put(moviesUrl + "/" + mov.movieId, data)
      .subscribe((response) => this.getMovies());
  }

  replaceStudio(stud: Studio) {
    let data = {
      name: stud.name,
      city: stud.city,
      state: stud.state,
    };
    this.http
      .put(studiosUrl + "/" + stud.studioId, data)
      .subscribe((response) => this.getMovies());
  }

  updateMovie(id: number, changes: Map<string, any>) {
    let patch = [];
    changes.forEach((value, key) =>
      patch.push({ op: "replace", path: key, value: value })
    );
    this.http
      .patch(moviesUrl + "/" + id, patch)
      .subscribe((response) => this.getMovies());
  }

  deleteMovie(id: number) {
    this.http
      .delete(moviesUrl + "/" + id)
      .subscribe((response) => this.getMovies());
  }

  deleteStudio(id: number) {
    this.http.delete(studiosUrl + "/" + id).subscribe((response) => {
      this.getMovies();
      this.getStudios();
    });
  }

  get filter(): Filter {
    return this.filterObject;
  }

  get pagination(): Pagination {
    return this.paginationObject;
  }

  storeSessionData(dataType: string, data: any) {
    return this.http
      .post(sessionUrl + "/" + dataType, data)
      .subscribe((reponse) => {});
  }

  getSessionData(dataType: string): any {
    return this.http.get(sessionUrl + "/" + dataType);
  }

  getOrders() {
    this.http.get<Order[]>(ordersUrl).subscribe(data => this.orders = data);
  }

  createOrder(order: Order) {
    this.http
      .post<any>(ordersUrl, {
        name: order.name,
        address: order.address,
        payment: order.payment,
        movies: order.movies,
      })
      .subscribe((data) => {
        order.orderConfirmation = data;
        order.cart.clear();
        order.clear();
      });
  }

  shipOrder(order: Order) {
    this.http.post(ordersUrl + "/" + order.orderId, null).subscribe( r => this.getOrders());
  }
}
