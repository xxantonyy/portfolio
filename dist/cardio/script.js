'use strict';
//npm install glitch-canvas

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputTemp = document.querySelector('.form__input--temp');
const inputClimb = document.querySelector('.form__input--climb');
const icon = document.querySelector('.icon');

setInterval(function() {
      icon.classList.add('pulsate');
      setTimeout(() => icon.classList.remove('pulsate'), 1 * 1000);
   },2* 1000);

class Workout {
      date = new Date();
      id = (Date.now() + '').slice(-10);
      clickNumber = 0;

      constructor(coords, distance, duration) {
       this.coords =coords;
       this.distance = distance;
       this.duration = duration;
      }
      setDescription () {
            if(this.type === 'running' 
            ? this.description = `Пробежка ${new Intl.DateTimeFormat('ry-Ru').format(this.date)}` 
            : this.description = `Велотренеровка ${new Intl.DateTimeFormat('ry-Ru').format(this.date)}`);
            
      }
      click() {
            this.clickNumber++;
      }
};

class Running extends Workout {
      type = 'running'
      constructor(coords, distance, duration, temp) 
      {
            super(coords, distance, duration)
            this.temp = temp;
            this.calculatePace();
            this.setDescription();
      }
      calculatePace () {
            this.pace = this.duration/ this.distance;
      }
      
};

class Cycling extends Workout {
      type = 'cycling'
      constructor(coords, distance, duration, climb) 
      {
            super(coords, distance, duration)
            this.climb = climb;
            this.calculateSpeed();
            this.setDescription();
      }
      calculateSpeed () {
            this.speed = this.distance / this.duration / 60;
      }
};

// const running = new Running([50,39], 7, 40, 170);
// const cycling = new Cycling([50,39], 37, 80, 370);

class App {

      #map;
      #mapEvent;
      #workouts = [];
      
      constructor() {
            // Получение местоположения пользователя
            this._getPosition();
            // Получения данных из localStorage
            this._getLocalStorageData();
            // Добавление обработчика события
            form.addEventListener('submit',this._newWorkout.bind(this));       
            // Переключение между велосипедом и пробежкой 
            inputType.addEventListener('change' ,this._toggleClimdField);
            containerWorkouts.addEventListener('click', this._moveToWorkout.bind(this));

      }
      _getPosition() {
            if(navigator.geolocation){
                  navigator.geolocation.getCurrentPosition(this._loadMap.bind(this), function () {
                             alert('Невозможно получить ваше местоположение');
                       }
                       );
           };

      }
      _loadMap (position) {
             const {latitude} = position.coords;
             const {longitude} = position.coords;
             console.log(`https://www.google.com/maps/@${latitude},${longitude}z`);

             const cords = [latitude, longitude];
             this.#map = L.map('map').setView(cords, 13);

             L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(this.#map);
      
            // Обработка клика на карте
            this.#map.on('click', this._showForm.bind(this));
            
            // Отображение тренировок из LocalStorage на карте
            this.#workouts.forEach(workout => {
                  this._displayWorkout(workout);
            });
                  
      }
      _showForm(e) {
            this.#mapEvent = e;
            // Отображение формы при клике на карту
            form.classList.remove('hidden');
            inputDistance.focus();  
      }
      _hideForm () {
            inputDistance.value = inputDuration.value = inputTemp.value = inputClimb.value = '';
            form.classList.add('hidden');
      }
      _toggleClimdField() {
            inputClimb.closest('.form__row').classList.toggle('form__row--hidden');
            inputTemp.closest('.form__row').classList.toggle('form__row--hidden');
      }
      _newWorkout(e) {
            const areNumbers = (...numbers)=> numbers.every(num => Number.isFinite(num));
            const areNumbersPositive = (...numbers)=> numbers.every(num => num >0);
            e.preventDefault();
            const {lat,lng} = this.#mapEvent.latlng;
            
            // Получить данные из формы
            const type = inputType.value;
            const distance = +inputDistance.value;
            const duration =+inputDuration.value;
            let workout;
        
            // Если тренировка является пробежкой, создать объект Running
            if(type === 'running'){
              const temp = +inputTemp.value;
              // Проверка валидности данных
              console.log('123')
              if( !areNumbers(distance,duration,temp) || !areNumbersPositive(distance,duration,temp)
                  // !Number.isFinite(distance)
                  // || !Number.isFinite(duration)
                  // || !Number.isFinite(temp)
                  )     return alert('Введите положительное число');  
              
                  workout = new Running([lat,lng], distance,duration,temp); 
            }
            // Если тренировка является Велотренировкой, создать объект Cycling
            if(type === 'cycling'){       
              const climb = +inputClimb.value;
              // Проверка валидности данных 
              if( !areNumbers(distance,duration,climb) || !areNumbersPositive(distance,duration)
                  // !Number.isFinite(distance)
                  // || !Number.isFinite(duration)
                  // || !Number.isFinite(climb)
                  )  return alert('Введите положительное число');  
                   
                  workout = new Cycling([lat,lng], distance,duration,climb);
            }
            // Добавить новый объекст в массив тренировок
            this.#workouts.push(workout);
            // Отобразить тренировку на карте
            this._displayWorkout(workout);
            // Отобразить тренировку в списке
            this._displayWorkoutOnSideBar(workout);
            // Спрятать форму и очистить поля ввода данных
            this._hideForm();   
            
            // Добавить все тренировки в локальное хранилище
            this._addWorkoutsToLocalStorage();
      }
      _displayWorkout(workout) {
            L.marker(workout.coords)
            .addTo(this.#map)
            .bindPopup(L.popup({
                  autoClose: false,
                  closeOnClick: false,
                  className: `${workout.type}-popup`
            }))
            .setPopupContent(`${workout.type === 'running' ? '🏃':'🚵‍♂️'} ${workout.description}`)
            .openPopup();

      };

      _displayWorkoutOnSideBar (workout) {
            let html = `
            <li class="workout workout--${workout.type}" data-id="${workout.id}">
          <h2 class="workout__title">${workout.description}</h2>
          <div class="workout__details">
            <span class="workout__icon">${workout.type === 'running' ? '🏃':'🚵‍♂️'}</span>
            <span class="workout__value">${workout.distance}</span>
            <span class="workout__unit">км</span>
          </div>
          <div class="workout__details">
            <span class="workout__icon">⏱</span>
            <span class="workout__value">${workout.duration}</span>
            <span class="workout__unit">мин</span>
          </div>
          
            `
            if(workout.type === 'running'){
                  html += `<div class="workout__details">
                   <span class="workout__icon">📏⏱</span>
                   <span class="workout__value">${workout.pace.toFixed(2)}</span>
                   <span class="workout__unit">мин/км</span>
                 </div>
                 <div class="workout__details">
                   <span class="workout__icon">👟⏱</span>
                   <span class="workout__value">${workout.temp}</span>
                   <span class="workout__unit">шаг/мин</span>
                 </div>
                </li>
                `
            }
            if(workout.type === 'cycling') {
                  html += `<div class="workout__details">
                  <span class="workout__icon">📏⏱</span>
                  <span class="workout__value">${workout.speed.toFixed(2)}</span>
                  <span class="workout__unit">км/ч</span>
                </div>
                <div class="workout__details">
                  <span class="workout__icon">🏔</span>
                  <span class="workout__value">${workout.climb}</span>
                  <span class="workout__unit">м</span>
                </div>
                </li>
                `
            }
      form.insertAdjacentHTML('afterend', html);
      }
      
      _moveToWorkout(e) {
            const workoutElement = e.target.closest('.workout');
            console.log(workoutElement);


            if(!workoutElement) return

            const workout = this.#workouts.find(item => item.id === workoutElement.dataset.id);

            this.#map.setView(workout.coords, 13, {
                  animate: true,
                  pan: {
                        duration: 1,
                  }
            });

      };
      _addWorkoutsToLocalStorage() {
            localStorage.setItem('workouts', JSON.stringify(this.#workouts));
      };
      _getLocalStorageData() {
            const data = JSON.parse(localStorage.getItem('workouts'));
            console.log(data);

            if(!data) return;
            this.#workouts = data;

            this.#workouts.forEach(workout => {
                  this._displayWorkoutOnSideBar(workout);
            });
      };
      reset (){
            localStorage.removeItem('workouts');
            location.reload();
      };
};

const app = new App();



