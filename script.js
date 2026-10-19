/* Elternvertreter-Starterkit
   Kleine Helfer: Checklisten merken, Vorlagen kopieren und speichern,
   Bundesland merken. Alles bleibt im Browser, nichts wird gesendet. */

(function () {
  "use strict";

  function lies(schluessel, standard) {
    try {
      var roh = window.localStorage.getItem(schluessel);
      return roh === null ? standard : JSON.parse(roh);
    } catch (e) {
      return standard;
    }
  }

  function schreib(schluessel, wert) {
    try {
      window.localStorage.setItem(schluessel, JSON.stringify(wert));
    } catch (e) {
      /* privater Modus oder gesperrter Speicher: dann eben ohne Merken */
    }
  }

  /* Aktive Seite in der Navigation markieren */
  (function markiereNavigation() {
    var datei = window.location.pathname.split("/").pop() || "index.html";
    var links = document.querySelectorAll(".nav a");
    for (var i = 0; i < links.length; i++) {
      var ziel = links[i].getAttribute("href");
      if (ziel === datei || (datei === "" && ziel === "index.html")) {
        links[i].setAttribute("aria-current", "page");
      }
    }
    /* Auf schmalen Bildschirmen ist die Navigation eine wischbare Leiste:
       die aktuelle Seite in den sichtbaren Bereich rücken, ohne die Seite selbst zu scrollen */
    var aktiv = document.querySelector('.nav a[aria-current="page"]');
    var leiste = aktiv && aktiv.closest("ul");
    if (leiste && leiste.scrollWidth > leiste.clientWidth) {
      var r = aktiv.parentNode.getBoundingClientRect();
      var l = leiste.getBoundingClientRect();
      if (r.right > l.right - 40) {
        /* aktiven Punkt rechtsbündig zeigen, davor liegende bleiben angeschnitten sichtbar */
        leiste.scrollLeft += r.right - l.right + 48;
      }
    }
  })();

  /* Checklisten: Haken bleiben erhalten */
  (function checklisten() {
    var felder = document.querySelectorAll("[data-checkliste] input[type=checkbox]");
    if (!felder.length) return;
    var schluessel = "ev-checkliste";
    var stand = lies(schluessel, {});
    var balken = document.querySelector("[data-fortschritt]");
    var zahl = document.querySelector("[data-fortschritt-text]");

    function aktualisiere() {
      var erledigt = 0;
      for (var i = 0; i < felder.length; i++) {
        if (felder[i].checked) erledigt++;
      }
      if (balken) {
        balken.max = felder.length;
        balken.value = erledigt;
      }
      if (zahl) {
        zahl.textContent = erledigt + " von " + felder.length + " erledigt";
      }
    }

    for (var i = 0; i < felder.length; i++) {
      var f = felder[i];
      if (stand[f.id]) f.checked = true;
      f.addEventListener("change", function (ev) {
        stand[ev.target.id] = ev.target.checked;
        schreib(schluessel, stand);
        aktualisiere();
      });
    }
    aktualisiere();

    var reset = document.querySelector("[data-checkliste-reset]");
    if (reset) {
      reset.addEventListener("click", function () {
        if (!window.confirm("Alle Haken entfernen?")) return;
        for (var j = 0; j < felder.length; j++) felder[j].checked = false;
        stand = {};
        schreib(schluessel, stand);
        aktualisiere();
      });
    }
  })();

  /* Vorlagen: kopieren und als Datei speichern */
  (function vorlagen() {
    var karten = document.querySelectorAll(".vorlage");
    if (!karten.length) return;

    function dateiname(titel, endung) {
      return titel
        .toLowerCase()
        .replace(/ä/g, "ae").replace(/ö/g, "oe").replace(/ü/g, "ue").replace(/ß/g, "ss")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "") + "." + endung;
    }

    function speichere(inhalt, name, typ) {
      var blob = new Blob([inhalt], { type: typ + ";charset=utf-8" });
      var url = URL.createObjectURL(blob);
      var a = document.createElement("a");
      a.href = url;
      a.download = name;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
    }

    function alsMarkdown(titel, text) {
      return "# " + titel + "\n\n" + text.replace(/\n{3,}/g, "\n\n") + "\n";
    }

    function melde(karte, nachricht) {
      var feld = karte.querySelector(".rueckmeldung");
      if (!feld) return;
      feld.textContent = nachricht;
      clearTimeout(feld._timer);
      feld._timer = setTimeout(function () { feld.textContent = ""; }, 4000);
    }

    for (var i = 0; i < karten.length; i++) {
      (function (karte) {
        var pre = karte.querySelector("pre");
        var titel = (karte.querySelector("h3") || {}).textContent || "vorlage";
        titel = titel.trim();
        var text = pre ? pre.textContent.replace(/^\n+|\n+$/g, "") : "";

        var kopieren = karte.querySelector("[data-kopieren]");
        var txt = karte.querySelector("[data-txt]");
        var md = karte.querySelector("[data-md]");

        if (kopieren) {
          kopieren.addEventListener("click", function () {
            if (navigator.clipboard && navigator.clipboard.writeText) {
              navigator.clipboard.writeText(text).then(function () {
                melde(karte, "Kopiert. Du kannst den Text jetzt in Word oder eine E-Mail einfügen.");
              }, function () {
                fallbackKopie();
              });
            } else {
              fallbackKopie();
            }
            function fallbackKopie() {
              var bereich = document.createElement("textarea");
              bereich.value = text;
              bereich.setAttribute("readonly", "");
              bereich.style.position = "fixed";
              bereich.style.left = "-9999px";
              document.body.appendChild(bereich);
              bereich.select();
              var ok = false;
              try { ok = document.execCommand("copy"); } catch (e) { ok = false; }
              document.body.removeChild(bereich);
              melde(karte, ok ? "Kopiert." : "Kopieren hat nicht geklappt. Markiere den Text bitte von Hand.");
            }
          });
        }
        if (txt) {
          txt.addEventListener("click", function () {
            speichere(text + "\n", dateiname(titel, "txt"), "text/plain");
            melde(karte, "Datei gespeichert. In Word: Datei öffnen oder Inhalt einfügen.");
          });
        }
        if (md) {
          md.addEventListener("click", function () {
            speichere(alsMarkdown(titel, text), dateiname(titel, "md"), "text/markdown");
            melde(karte, "Datei gespeichert.");
          });
        }
      })(karten[i]);
    }
  })();

  /* Bundesland merken und filtern */
  (function bundesland() {
    var auswahl = document.querySelector("[data-land-auswahl]");
    if (!auswahl) return;
    var karten = document.querySelectorAll(".land[data-land]");
    var alle = document.querySelector("[data-land-alle]");
    var schluessel = "ev-bundesland";

    function zeige(code) {
      for (var i = 0; i < karten.length; i++) {
        var k = karten[i];
        if (code === "alle" || k.getAttribute("data-land") === code) {
          k.removeAttribute("hidden");
        } else {
          k.setAttribute("hidden", "");
        }
      }
      auswahl.value = code;
    }

    var gemerkt = lies(schluessel, null);
    var start = gemerkt || auswahl.getAttribute("data-standard") || "alle";
    if (window.location.hash) {
      var ausHash = window.location.hash.replace("#", "");
      for (var j = 0; j < karten.length; j++) {
        if (karten[j].getAttribute("data-land") === ausHash) start = ausHash;
      }
    }
    zeige(start);

    auswahl.addEventListener("change", function () {
      zeige(auswahl.value);
      schreib(schluessel, auswahl.value);
      if (auswahl.value !== "alle" && window.history.replaceState) {
        window.history.replaceState(null, "", "#" + auswahl.value);
      }
    });
    if (alle) {
      alle.addEventListener("click", function () {
        zeige("alle");
        schreib(schluessel, "alle");
      });
    }
  })();

  /* Vor dem Drucken alle Antworten aufklappen */
  window.addEventListener("beforeprint", function () {
    var details = document.querySelectorAll("details");
    for (var i = 0; i < details.length; i++) {
      if (!details[i].open) {
        details[i].setAttribute("data-war-zu", "");
        details[i].open = true;
      }
    }
  });
  window.addEventListener("afterprint", function () {
    var details = document.querySelectorAll("details[data-war-zu]");
    for (var i = 0; i < details.length; i++) {
      details[i].open = false;
      details[i].removeAttribute("data-war-zu");
    }
  });
})();
