
import { RequestOptions, Headers, RequestMethod } from '@angular/http';
import { environment } from '../../environments/environment';


export class BaseSerice {
    constructor() { }

    private m_Headers: Headers;
    private m_RequestOptions: RequestOptions;
    private m_ApiUrl:string;

    protected getRequestOptions(): RequestOptions{
        this.m_Headers= new Headers({ 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' });                   
        this.m_RequestOptions = new RequestOptions({ headers: this.m_Headers });
        return this.m_RequestOptions;

    }

    protected getRequestOptionsWithToken(): RequestOptions{
        let userInfo = JSON.parse(localStorage.getItem("UserInfo"));       
        this.m_Headers= new Headers({ 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' });
        this.m_Headers.append( 'Authorization', 'Bearer ' + this.getCurrentToken());                    
        this.m_RequestOptions = new RequestOptions({ headers: this.m_Headers });
        return this.m_RequestOptions;       

    }
   
    protected serializeModelObject(argModelObject: any) {
        var result = [];
        for (var property in argModelObject)
          result.push(encodeURIComponent(property) + "=" + encodeURIComponent(argModelObject[property]));
        return result.join("&");
      }

     protected getWebApiUrl():string{
         this.m_ApiUrl=environment.apiUrl;
         return this.m_ApiUrl;
     }

     protected getDocumentumRequestOptions(): RequestOptions{
        this.m_Headers= new Headers({ 'Accept': 'application/json' });
        this.m_Headers.append( 'Authorization', 'Bearer ' + this.getCurrentToken());                  
        this.m_RequestOptions = new RequestOptions({ headers: this.m_Headers });
        return this.m_RequestOptions;
     }

     protected getCurrentToken():string{
        let userInfo = JSON.parse(localStorage.getItem("UserInfo"));  
        return btoa(userInfo.AuthorizationToken);
     }
}
