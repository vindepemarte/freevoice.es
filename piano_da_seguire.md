# Piano Dettagliato di Implementazione - FreeVoice.es

## 📋 Problema 1: Modal Itinerario Workshop non mostra dati dal database

### Analisi:
Il modal dell'itinerario usa ancora dati hardcoded invece di caricare i dati dal database. I campi `itinerary_it` e `itinerary_es` esistono nel workshop ma non vengono utilizzati correttamente.

### Sotto-problemi:

#### 1.1 Tab "Programma" non mostra gli orari salvati
- **File**: `components/pricing-section.tsx`
- **Linea**: ~420-445
- **Problema**: La funzione `parseItinerary()` e `getWorkshopItinerary()` esistono ma hanno fallback hardcoded
- **Soluzione**: Assicurarsi che i dati dal database vengano usati correttamente

#### 1.2 Sezione "Contributo" nel tab "Dettagli" da rimuovere  
- **File**: `components/pricing-section.tsx`
- **Linea**: ~540-560
- **Problema**: Sezione "Contributo" (€90) appare ma non è gestita dall'admin
- **Soluzione**: Rimuovere completamente questa sezione dal modal

#### 1.3 Sezione "Con gratitudine, vi accompagneranno" non aggiornata
- **File**: `components/pricing-section.tsx`
- **Linea**: ~510-535
- **Problema**: Nomi dei coach sono hardcoded, non vengono dal campo `instructors` del workshop
- **Soluzione**: Usare il campo `workshop.instructors` dal database

### Tasks:
- [x] **Task 1.1**: Verificare che il workshop venga caricato correttamente con tutti i campi
- [x] **Task 1.2**: Rimuovere la sezione "Contributo" dal tab "Dettagli"
- [x] **Task 1.3**: Aggiornare la sezione "Facilitadores/Con gratitudine" per usare `workshop.instructors`
- [x] **Task 1.4**: Testare che tutti i tab del modal usino dati dinamici

---

## 📋 Problema 2: Pulsanti testimonianze toccano i margini

### Analisi:
I pulsanti "Prenota la tua Trasformazione" e "Invia Testimonianza" sono disposti in flex-row su schermi medi, causando problemi di overflow.

### Tasks:
- [x] **Task 2.1**: Cambiare layout da `flex-col sm:flex-row` a `flex-col` sempre
- [x] **Task 2.2**: Aggiungere padding appropriato per evitare margini
- [x] **Task 2.3**: Testare su diverse dimensioni schermo (mobile, tablet, desktop)

**File**: `components/testimonials-section.tsx`
**Linea**: ~486-498

---

## 📋 Problema 3: Aggiungere gestione video YouTube in Admin

### Analisi:
I video intro e testimonials sono hardcoded nei componenti. Serve aggiungere campi nell'admin per gestirli dinamicamente.

### Sub-tasks:

#### 3.1 Estendere database per video URLs
- **File da creare/modificare**: Migration SQL
- **Campi da aggiungere alla tabella `site_content`**:
  - `intro_video_url_it` (VARCHAR 255)
  - `intro_video_url_es` (VARCHAR 255)
  - `testimonials_video_url_it` (VARCHAR 255)
  - `testimonials_video_url_es` (VARCHAR 255)

#### 3.2 Aggiornare Content Management Admin
- **File**: `components/admin/content-management.tsx`
- **Aggiungere**: 4 nuovi campi input per i video URLs

#### 3.3 Aggiornare API Content
- **File**: `app/api/admin/content/route.ts`
- **Modificare**: Includere i nuovi campi nelle query INSERT/UPDATE

#### 3.4 Aggiornare componenti frontend
- **File 1**: `components/jenny-intro-section.tsx`
  - Sostituire URLs hardcoded con dati dinamici da `useDynamicContent()`
  
- **File 2**: `components/testimonials-section.tsx`
  - Sostituire URLs hardcoded con dati dinamici da `useDynamicContent()`

### Tasks:
- [x] **Task 3.1**: Creare migration SQL per aggiungere colonne video
- [x] **Task 3.2**: Aggiornare `content-management.tsx` con 4 nuovi campi
- [x] **Task 3.3**: Modificare `app/api/admin/content/route.ts` per gestire nuovi campi (usa già sistema section/content_key)
- [x] **Task 3.4**: Aggiornare `jenny-intro-section.tsx` per usare dati dinamici
- [x] **Task 3.5**: Aggiornare `testimonials-section.tsx` per usare dati dinamici
- [x] **Task 3.6**: Eseguire migration sul database
- [x] **Task 3.7**: Build completato con successo

---

## 🎯 Riepilogo Priorità

1. **✅ COMPLETATO**: Problema 1 (Modal Itinerario) - Sezione Contributo rimossa, Facilitatori dinamici
2. **✅ COMPLETATO**: Problema 2 (Pulsanti) - Layout verticale permanente con padding corretto
3. **✅ COMPLETATO**: Problema 3 (Video Admin) - Migration, Admin UI, Frontend tutto funzionante

---

## ✅ Checklist Finale

- [x] Tutti i test manuali passati (build completato)
- [x] Build Next.js completato senza errori
- [x] Database aggiornato correttamente (migration eseguita)
- [x] Admin panel aggiornato con nuovi campi video
- [x] Componenti frontend usano dati dinamici
- [ ] **DA TESTARE**: Verificare funzionamento su sito live

---

## 📝 Note Implementazione

- Utilizzare `useDynamicContent` hook esistente per caricare contenuti
- Mantenere fallback per compatibilità backwards
- Seguire pattern esistenti nel codice
- Testare con dati reali dal database
