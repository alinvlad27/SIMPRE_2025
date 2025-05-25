<h1>SIMPRE-Project</h1>
<p>Proiect Cloud Computing Vlad Alin-Petrișor</p>
<p>Grupa 1134</p>

## 1. INTRODUCERE
<p>Proiectul „Simpre-2025” este o aplicație web de gestionare a notițelor, dezvoltată folosind Next.js, care permite utilizatorilor să se înregistreze, să se autentifice și să administreze notițe personale (creare, editare, ștergere). Aplicația utilizează MongoDB pentru stocarea datelor și este implementată pe Vercel, fiind accesibilă online. Această documentație oferă o prezentare generală a problemei abordate, structurii API, fluxului de date și reprezentării vizuale a aplicației.</p>


## 2. DESCRIERE PROBLEMĂ
Problema principală pe care o abordează acest proiect este lipsa unei platforme simple, sigure și accesibile pentru gestionarea notițelor personale online. Multe soluții existente necesită configurări complexe sau nu au interfețe prietenoase cu utilizatorul. Această aplicație își propune să ofere o soluție intuitivă, cu autentificare securizată, asigurând confidențialitatea datelor și ușurința în utilizare, fiind implementată pe o platformă serverless precum Vercel.


## 3. DESCRIERE API
Aplicația include un API RESTful integrat în Next.js, situat în directorul pages/api/. Principalele endpoint-uri sunt:
 ```bash
•	POST /api/users/register: Înregistrează un utilizator nou cu nume de utilizator, email și parolă. 
•	POST /api/users/login: Autentifică un utilizator și returnează un token JWT. 
•	GET /api/users/verify: Verifică token-ul JWT pentru cereri autentificate. 
•	GET /api/noteCtrl: Returnează toate notițele utilizatorului autentificat. 
•	POST /api/noteCtrl: Creează o notiță nouă. 
•	PUT /api/noteCtrl: Actualizează o notiță existentă. 
•	DELETE /api/noteCtrl: Șterge o notiță.
 ```

## 4. FLUX DE DATE
Aplicația urmează o arhitectură client-server, cu următorul flux de date: 
•	Exemple de cereri/răspunsuri: 

```bash
    -Cerere de înregistrare: 
POST /api/users/register
Body: { 
        "username": "user1", "email": "user1@example.com", "password": "password123" 
      }
Response (Succes) { 
                    "msg": "Utilizator înregistrat cu succes" 
  			      } (200 OK)
Response (Error) { 
                    "msg": "Email-ul există deja" 
                 } (400 Bad Request).
 ```
 ```bash
    -Cerere de autentificare: 
POST /api/users/login 
Body:  { 
         "email": "user1@example.co"password": "password123"
       } 
Response (Succes) { 
                    "token": "jwt_token_here" 
                  } (200 OK) 
Response (Error) { 
                    "msg": "Email sau parolă invalidă" \
 			     } (400 Bad Request).
 ```
```bash
    -Cerere de obținere notițe: 
GET /api/noteCtrl 
Header: Authorization: Bearer jwt_token_here 
Response: [{
             "_id": "note_id", "title": "Notiță 1", "content": "Conținut 1", "date": "2025-05-25"
        }].
```

```bash
•	Metode HTTP: POST, GET, PUT, DELETE.
•	Autentificare și autorizare: Utilizează JWT (JSON Web Token) pentru autentificare. Token-ul este generat la autentificare și inclus în antetul Authorization pentru toate cererile protejate. Serviciile utilizate includ MongoDB Atlas pentru stocarea datelor și Vercel pentru implementare.
 ```

## 5. CAPTURI DE ECRAN
<img src="https://github.com/alinvlad27/SIMPRE_2025/blob/main/img/image1.png" alt="Image 1">
<img src="https://github.com/alinvlad27/SIMPRE_2025/blob/main/img/image2.png" alt="Image 2">
<img src="https://github.com/alinvlad27/SIMPRE_2025/blob/main/img/image3.png" alt="Image 3">
<img src="https://github.com/alinvlad27/SIMPRE_2025/blob/main/img/image4.png" alt="Image 4">
<img src="https://github.com/alinvlad27/SIMPRE_2025/blob/main/img/image5.png" alt="Image 5">