const solarSystemMode = true;
let processOnGoing = true;

let onMouseColoring = false;
let onMouseAttraction = false;

let tracingMode = false; // do not change in code(it is going to be a mistake)

const attractorCount = 1;
const attractorRadius = 40;
const attractorMass = 12 * Math.pow(10, 6);

const ballsCount = 12;
const constBallRadius = 20;
const ballRadius = [10, 30];
const ballMass = 5 * Math.pow(10, 6);
const differentBallsRadius = false;

const colors = [
  "#58D3F7",
  "#FA5858",
  "#00FF80",
  "#FF8C00",
  "#FF1493",
  "#4B0082"
];

const PhysicsConst_G = 6.67408 * Math.pow(10, -11);

let attractors = [];
let balls = [];
let currentPos = [];

let savedConfigurations = [
  {
    attractors: [{ x: 697, y: 490.5, r: 40 }],
    balls: [
      {
        r: 20,
        v: new Vector(-1.0220095882581453, -1.966502097591688),
        x: 118.4025266951703,
        y: 447.70644042810704
      },
      {
        r: 20,
        v: new Vector(-2.5960435280348833, -0.22127608413945343),
        x: 688.6765145577228,
        y: 781.4490555479999
      },
      {
        r: 20,
        v: new Vector(4.6998817743326065, 1.5869828189595174),
        x: 804.2846088596142,
        y: 374.3932849344354
      },
      {
        r: 20,
        v: new Vector(-1.2987543173895006, -2.859578103153915),
        x: 1040.6363944669101,
        y: 236.14900226169084
      },
      {
        r: 20,
        v: new Vector(3.1870777795129936, -1.014985595817861),
        x: 611.1395690589886,
        y: 766.3054174890445
      },
      {
        r: 20,
        v: new Vector(-7.900355680182687, -3.421674466810304),
        x: 749.2620984483184,
        y: 420.3838536952645
      },
      {
        r: 20,
        v: new Vector(3.81245576315033, -0.830566653302761),
        x: 620.9516519660926,
        y: 272.72495115222193
      },
      {
        r: 20,
        v: new Vector(-2.285927242183155, 2.9178895366589566),
        x: 1017.542819318406,
        y: 586.139102090814
      }
    ]
  }
];
