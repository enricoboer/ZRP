import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoadingController, ToastController } from 'ionic-angular';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  nome: String = '';
  dadosPokemon = [];
  pokemoninformado = false;

  constructor(public navCtrl: NavController, private http: HttpClient, private loadingCtrl: LoadingController, private toastController: ToastController) {

  }

  primeiraLetraMaiuscula(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  buscarPokemon() {
    this.dadosPokemon = [];

    if (this.nome == '') {
      this.pokemoninformado = false;
      const toast = this.toastController.create({
        message: 'Informe o nome de um Pokémon!',
        duration: 2000
      });
      toast.present();
    } else {
      const loader = this.loadingCtrl.create({
        content: "Pesquisando..."
      });
      loader.present();


      let url = 'http://localhost/pokeapi/apijson.php?nome=' + this.nome.toLowerCase();

      this.http.get(url).subscribe((data: any) => {
        this.pokemoninformado = true;

        if (data['Resultado'] == 1) {
          let dados = JSON.parse(data['MensagemResultado']);
          let habilidades = [];

          if (dados['abilities'].length > 0) {
            for (var i = 0; i < dados['abilities'].length; i++) {
              habilidades.push(this.primeiraLetraMaiuscula(dados['abilities'][i]['ability']['name']))
            }
          }


          this.dadosPokemon = [{
            'nome': this.primeiraLetraMaiuscula(dados['species']['name']),
            'imagem': dados['sprites']['other']['home']['front_default'],
            'habilidades': habilidades.sort(),
          }];

          loader.dismiss();
        } else {
          loader.dismiss();
        }
      }, (err) => {
        loader.dismiss();
      });
    }
  }

}
