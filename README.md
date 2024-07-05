# Online Shop

Dieses Projekt ist eine Frontend-Anwendung zur Verwaltung von Produkten und Kategorien in einem Online-Shop. Es bietet Benutzerauthentifizierung, Produkt- und Kategorieverwaltung durch eine benutzerfreundliche Oberfläche und kommuniziert mit einer API, die mit Express und einer SQLite-Datenbank entwickelt wurde. Tailwind CSS wird für das Design und Styling der Benutzeroberfläche verwendet, was die effiziente Erstellung moderner und responsiver UI-Komponenten ermöglicht.

## Installation

Sie müssen mein Repository klonen: `https://github.com/A5TUT0/OnlineShop.git`.

Dann müssen Sie in den Ordner `Code` wechseln: `cd OnlineShop/Code`.

Als nächstes müssen Sie im Terminal `npm install` & `npm install cors` eingeben.$

Nacher dass mahcen sie `node app.js`

## Nutzung

1. Öffnen Sie Ihren Webbrowser und navigieren Sie zu `http://localhost:3000`.
2. Sie können einen neuen Benutzer registrieren, sich anmelden, Produkte und Kategorien über die bereitgestellte Benutzeroberfläche verwalten. Wenn Sie sich als Administrator registrieren möchten, müssen Sie sich mit Benutzername: admin und Passwort: admin anmelden.

## API Endpunkte

### Benutzerverwaltung

- **Registrieren eines neuen Benutzers**
  - **URL:** `http://localhost:3000/register`
  - **Methode:** `POST`
  - **Beschreibung:** Registrieren eines neuen Benutzers.

- **Einloggen eines Benutzers**
  - **URL:** `http://localhost:3000/login`
  - **Methode:** `POST`
  - **Beschreibung:** Einloggen eines Benutzers.

- **Passwort zurücksetzen**
  - **URL:** `http://localhost:3000/reset-password`
  - **Methode:** `POST`
  - **Beschreibung:** Zurücksetzen des Passworts eines Benutzers.

### Kategorienverwaltung

- **Alle Kategorien abrufen**
  - **URL:** `http://localhost:3000/categories`
  - **Methode:** `GET`
  - **Beschreibung:** Abrufen aller Kategorien.

- **Neue Kategorie erstellen**
  - **URL:** `http://localhost:3000/categories`
  - **Methode:** `POST`
  - **Beschreibung:** Erstellen einer neuen Kategorie.

- **Kategorie nach ID abrufen**
  - **URL:** `http://localhost:3000/categories/{id}`
  - **Methode:** `GET`
  - **Beschreibung:** Abrufen einer Kategorie anhand ihrer ID.

- **Kategorie aktualisieren**
  - **URL:** `http://localhost:3000/categories/{id}`
  - **Methode:** `PUT`
  - **Beschreibung:** Aktualisieren einer Kategorie anhand ihrer ID.

- **Kategorie löschen**
  - **URL:** `http://localhost:3000/categories/{id}`
  - **Methode:** `DELETE`
  - **Beschreibung:** Löschen einer Kategorie anhand ihrer ID.

### Produktverwaltung

- **Alle Produkte abrufen**
  - **URL:** `http://localhost:3000/products`
  - **Methode:** `GET`
  - **Beschreibung:** Abrufen aller Produkte.

- **Neues Produkt erstellen**
  - **URL:** `http://localhost:3000/products`
  - **Methode:** `POST`
  - **Beschreibung:** Erstellen eines neuen Produkts.

- **Produkt nach ID abrufen**
  - **URL:** `http://localhost:3000/products/{id}`
  - **Methode:** `GET`
  - **Beschreibung:** Abrufen eines Produkts anhand seiner ID.

- **Produkt aktualisieren**
  - **URL:** `http://localhost:3000/products/{id}`
  - **Methode:** `PUT`
  - **Beschreibung:** Aktualisieren eines Produkts anhand seiner ID.

- **Produkt löschen**
  - **URL:** `http://localhost:3000/products/{id}`
  - **Methode:** `DELETE`
  - **Beschreibung:** Löschen eines Produkts anhand seiner ID.

### Beschreibung der Hauptdateien

- **app.js:** Die Hauptdatei der Anwendung, die den Express-Server konfiguriert und startet. Sie definiert die verschiedenen API-Endpunkte für die Benutzer-, Produkt- und Kategorienverwaltung.
- **database.sqlite:** Die SQLite-Datenbankdatei, die alle Anwendungsdaten wie Benutzer, Produkte und Kategorien speichert.
- **swagger.json:** Diese Datei enthält die Swagger-Dokumentation für die API, die eine visuelle und interaktive Darstellung der API-Endpunkte und ihrer Funktionalitäten bietet.
- **tailwind.config.js:** Diese Datei konfiguriert Tailwind CSS, ein CSS-Framework, das zur Gestaltung der Anwendung verwendet wird.
- **src/index.html:** Die Haupt-HTML-Datei der Anwendung, die als Einstiegspunkt dient. Sie enthält die grundlegende Struktur und Verweise auf CSS- und JavaScript-Dateien.
- **src/main.js:** Enthält den Haupt-JavaScript-Code, der die Funktionalität der Anwendung steuert, einschließlich Ereignishandlern und API-Aufrufen.

## Verwendete Technologien

- **Node.js und Express:** Backend-Technologien zur Erstellung des Servers und der API-Endpunkte.
- **SQLite:** Datenbank zur Speicherung der Anwendungsdaten.
- **Tailwind CSS:** Ein CSS-Framework zur Gestaltung der Anwendung.
- **Swagger:** Ein Tool zur Dokumentation und Interaktion mit der API.
