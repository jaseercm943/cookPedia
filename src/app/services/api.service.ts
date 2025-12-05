import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  serverUrl = "https://cookpediaserver-xx6l.onrender.com"

  constructor(private http: HttpClient) { }

  getAllRecipeAPI() {
    return this.http.get(`${this.serverUrl}/all-recipe`)
  }

  addTestimonyAPI(reqBody: any) {
    return this.http.post(`${this.serverUrl}/add-testimony`, reqBody)
  }

  registerAPI(reqBody: any) {
    return this.http.post(`${this.serverUrl}/register`, reqBody)
  }

  loginAPI(reqBody: any) {
    return this.http.post(`${this.serverUrl}/login`, reqBody)
  }

  appendToken() {

    let headers = new HttpHeaders
    const token = sessionStorage.getItem('token')

    if (token) {
      // headers must be re-assigned after appending the token
      headers = headers.append("authorization", `Bearer ${token}`)
    }
    return { headers }
  }

  // get single recipe 
  singleRecipeAPI = (recipeId: string) => {
    return this.http.get(`${this.serverUrl}/single-recipe/${recipeId}`, this.appendToken())
  }

  // get single recipe 
  relatedRecipeAPI = (cuisine: string) => {
    return this.http.get(`${this.serverUrl}/related-recipes?cuisine=${cuisine}`, this.appendToken())
  }

  // save recipe
  saveRecipeAPI = (recipeId: string, reqBody: any) => {
    return this.http.post(`${this.serverUrl}/save/recipe/${recipeId}`, reqBody, this.appendToken())
  }

  // saved-recipes
  getUserSavedRecipeAPI = () => {
    return this.http.get(`${this.serverUrl}/saved-recipes`, this.appendToken())
  }

  // delete recipe
  deleteSavedRecipeAPI = (id: string) => {
    return this.http.delete(`${this.serverUrl}/saved-recipes/remove/${id}`, this.appendToken())
  }

  downloadRecipeAPI = (recipeId: string, reqBody: any) => {
    return this.http.post(`${this.serverUrl}/recipe/download/${recipeId}`, reqBody, this.appendToken())
  }

  getDownloadRecipeAPI = () => {
    return this.http.get(`${this.serverUrl}/user-downloads`, this.appendToken())
  }

  editUserAPI = (reqBody: any) => {
    return this.http.put(`${this.serverUrl}/user/edit`, reqBody, this.appendToken())
  }

  allUserAPI = () => {
    return this.http.get(`${this.serverUrl}/all-users`, this.appendToken())
  }

  downloadListAPI = () => {
    return this.http.get(`${this.serverUrl}/downloadlist`, this.appendToken())
  }

  getFeedbackListAPI = () => {
    return this.http.get(`${this.serverUrl}/requestlist`, this.appendToken())
  }

  updateFeedbackStatusAPI = (id: string, status: string) => {
    return this.http.put(`${this.serverUrl}/feedback-update/${id}?status=${status}`, {}, this.appendToken())
  }

  getApprovedTestimonialAPI = () => {
    return this.http.get(`${this.serverUrl}/all-approved-feedbacks`)
  }

  addRecipeAPI = (reqBody: any) => {
    return this.http.post(`${this.serverUrl}/add-recipe`, reqBody, this.appendToken())
  }

  updateRecipeAPI = (id:string, reqBody: any) => {
    return this.http.put(`${this.serverUrl}/recipe/${id}/edit`, reqBody, this.appendToken())
  }

  deleteRecipeAPI = (id:string) => {
    return this.http.delete(`${this.serverUrl}/recipe/${id}/delete`, this.appendToken())
  }

  getChartData(){
    this.downloadListAPI().subscribe((res:any) => {
      let output: any = {}
      let downloadArrayList: any = []
      res.forEach((item: any) => {
        let cuisine = item.recipeCuisine

        if (output.hasOwnProperty(cuisine)) {
          output[cuisine] += item.count
        }
        else {
          output[cuisine] = item.count
        }
      });

      // console.log('out', output);

      for (let cuisine in output) {
        downloadArrayList.push({ name: cuisine, y: output[cuisine] })

      }
      // console.log('out', downloadArrayList);

      sessionStorage.setItem("chart", JSON.stringify(downloadArrayList))
    })
  }
}



