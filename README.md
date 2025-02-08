<h1>Picking Optimization</h1>

<p>Simple HTTP server providing a service to optimize picking of products for an order. The goal is to minimize the time required to prepare orders and ensure the most efficient use of labor</p>

<a href="https://sterbye.github.io/Picking-Optimization/">Documentation: Picking-Optimization</a>

<h3>How to start</h3>
<ul>
  <li>Clone repository</li>
  <li>NPM install</li>
  <li>NPM start</li>
</ul>

<h3>Test endpoint</h3>
<ul>
  <li>Use Postman/Insomnia</li>
  <li>POST request</li>
  <li>Url: http://localhost:3000/api/optimize-picking</li>
</ul>

<p>Sample data: </p>
<code>{
  "products": ["product-1", "product-2"],
  "startingPosition": {"x": 0, "y": 0, "z": 0}
} </code>

<p>Euclidean distance formula: </br>
 distance = sqrt((x2 - x1)² + (y2 - y1)² + (z2 - z1)²)</p>

 Sources: <a href="https://unacademy.com/content/nda/study-material/mathematics/analytical-geometry-three-dimensions-distance-between-two-points/">3 Dimensions – Distance Between Two Points</a>
