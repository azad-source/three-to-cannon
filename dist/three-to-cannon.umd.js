!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports,require("cannon-es"),require("three")):"function"==typeof define&&define.amd?define(["exports","cannon-es","three"],t):t((e=e||self).threeToCannon={},e.cannonEs,e.THREE)}(this,function(e,t,n){var r=function(){var e,t,r,i,o=new n.Vector3;function a(){this.tolerance=-1,this.faces=[],this.newFaces=[],this.assigned=new l,this.unassigned=new l,this.vertices=[]}function s(){this.normal=new n.Vector3,this.midpoint=new n.Vector3,this.area=0,this.constant=0,this.outside=null,this.mark=0,this.edge=null}function u(e,t){this.vertex=e,this.prev=null,this.next=null,this.twin=null,this.face=t}function h(e){this.point=e,this.prev=null,this.next=null,this.face=null}function l(){this.head=null,this.tail=null}return Object.assign(a.prototype,{setFromPoints:function(e){!0!==Array.isArray(e)&&console.error("THREE.ConvexHull: Points parameter is not an array."),e.length<4&&console.error("THREE.ConvexHull: The algorithm needs at least four points."),this.makeEmpty();for(var t=0,n=e.length;t<n;t++)this.vertices.push(new h(e[t]));return this.compute(),this},setFromObject:function(e){var t=[];return e.updateMatrixWorld(!0),e.traverse(function(e){var r,i,o,a=e.geometry;if(void 0!==a)if(a.isGeometry){var s=a.vertices;for(r=0,i=s.length;r<i;r++)(o=s[r].clone()).applyMatrix4(e.matrixWorld),t.push(o)}else if(a.isBufferGeometry){var u=a.attributes.position;if(void 0!==u)for(r=0,i=u.count;r<i;r++)(o=new n.Vector3).fromBufferAttribute(u,r).applyMatrix4(e.matrixWorld),t.push(o)}}),this.setFromPoints(t)},containsPoint:function(e){for(var t=this.faces,n=0,r=t.length;n<r;n++)if(t[n].distanceToPoint(e)>this.tolerance)return!1;return!0},intersectRay:function(e,t){for(var n=this.faces,r=-Infinity,i=Infinity,o=0,a=n.length;o<a;o++){var s=n[o],u=s.distanceToPoint(e.origin),h=s.normal.dot(e.direction);if(u>0&&h>=0)return null;var l=0!==h?-u/h:0;if(!(l<=0)&&(h>0?i=Math.min(l,i):r=Math.max(l,r),r>i))return null}return e.at(-Infinity!==r?r:i,t),t},intersectsRay:function(e){return null!==this.intersectRay(e,o)},makeEmpty:function(){return this.faces=[],this.vertices=[],this},addVertexToFace:function(e,t){return e.face=t,null===t.outside?this.assigned.append(e):this.assigned.insertBefore(t.outside,e),t.outside=e,this},removeVertexFromFace:function(e,t){return e===t.outside&&(t.outside=null!==e.next&&e.next.face===t?e.next:null),this.assigned.remove(e),this},removeAllVerticesFromFace:function(e){if(null!==e.outside){for(var t=e.outside,n=e.outside;null!==n.next&&n.next.face===e;)n=n.next;return this.assigned.removeSubList(t,n),t.prev=n.next=null,e.outside=null,t}},deleteFaceVertices:function(e,t){var n=this.removeAllVerticesFromFace(e);if(void 0!==n)if(void 0===t)this.unassigned.appendChain(n);else{var r=n;do{var i=r.next;t.distanceToPoint(r.point)>this.tolerance?this.addVertexToFace(r,t):this.unassigned.append(r),r=i}while(null!==r)}return this},resolveUnassignedPoints:function(e){if(!1===this.unassigned.isEmpty()){var t=this.unassigned.first();do{for(var n=t.next,r=this.tolerance,i=null,o=0;o<e.length;o++){var a=e[o];if(0===a.mark){var s=a.distanceToPoint(t.point);if(s>r&&(r=s,i=a),r>1e3*this.tolerance)break}}null!==i&&this.addVertexToFace(t,i),t=n}while(null!==t)}return this},computeExtremes:function(){var e,t,r,i=new n.Vector3,o=new n.Vector3,a=[],s=[];for(e=0;e<3;e++)a[e]=s[e]=this.vertices[0];for(i.copy(this.vertices[0].point),o.copy(this.vertices[0].point),e=0,t=this.vertices.length;e<t;e++){var u=this.vertices[e],h=u.point;for(r=0;r<3;r++)h.getComponent(r)<i.getComponent(r)&&(i.setComponent(r,h.getComponent(r)),a[r]=u);for(r=0;r<3;r++)h.getComponent(r)>o.getComponent(r)&&(o.setComponent(r,h.getComponent(r)),s[r]=u)}return this.tolerance=3*Number.EPSILON*(Math.max(Math.abs(i.x),Math.abs(o.x))+Math.max(Math.abs(i.y),Math.abs(o.y))+Math.max(Math.abs(i.z),Math.abs(o.z))),{min:a,max:s}},computeInitialHull:function(){void 0===e&&(e=new n.Line3,t=new n.Plane,r=new n.Vector3);var i,o,a,u,h,l,c,d,f,p=this.vertices,m=this.computeExtremes(),v=m.min,x=m.max,g=0,y=0;for(l=0;l<3;l++)(f=x[l].point.getComponent(l)-v[l].point.getComponent(l))>g&&(g=f,y=l);for(g=0,e.set((o=v[y]).point,(a=x[y]).point),l=0,c=this.vertices.length;l<c;l++)(i=p[l])!==o&&i!==a&&(e.closestPointToPoint(i.point,!0,r),(f=r.distanceToSquared(i.point))>g&&(g=f,u=i));for(g=-1,t.setFromCoplanarPoints(o.point,a.point,u.point),l=0,c=this.vertices.length;l<c;l++)(i=p[l])!==o&&i!==a&&i!==u&&(f=Math.abs(t.distanceToPoint(i.point)))>g&&(g=f,h=i);var w=[];if(t.distanceToPoint(h.point)<0)for(w.push(s.create(o,a,u),s.create(h,a,o),s.create(h,u,a),s.create(h,o,u)),l=0;l<3;l++)d=(l+1)%3,w[l+1].getEdge(2).setTwin(w[0].getEdge(d)),w[l+1].getEdge(1).setTwin(w[d+1].getEdge(0));else for(w.push(s.create(o,u,a),s.create(h,o,a),s.create(h,a,u),s.create(h,u,o)),l=0;l<3;l++)d=(l+1)%3,w[l+1].getEdge(2).setTwin(w[0].getEdge((3-l)%3)),w[l+1].getEdge(0).setTwin(w[d+1].getEdge(1));for(l=0;l<4;l++)this.faces.push(w[l]);for(l=0,c=p.length;l<c;l++)if((i=p[l])!==o&&i!==a&&i!==u&&i!==h){g=this.tolerance;var T=null;for(d=0;d<4;d++)(f=this.faces[d].distanceToPoint(i.point))>g&&(g=f,T=this.faces[d]);null!==T&&this.addVertexToFace(i,T)}return this},reindexFaces:function(){for(var e=[],t=0;t<this.faces.length;t++){var n=this.faces[t];0===n.mark&&e.push(n)}return this.faces=e,this},nextVertexToAdd:function(){if(!1===this.assigned.isEmpty()){var e,t=0,n=this.assigned.first().face,r=n.outside;do{var i=n.distanceToPoint(r.point);i>t&&(t=i,e=r),r=r.next}while(null!==r&&r.face===n);return e}},computeHorizon:function(e,t,n,r){var i;this.deleteFaceVertices(n),n.mark=1,i=null===t?t=n.getEdge(0):t.next;do{var o=i.twin,a=o.face;0===a.mark&&(a.distanceToPoint(e)>this.tolerance?this.computeHorizon(e,o,a,r):r.push(i)),i=i.next}while(i!==t);return this},addAdjoiningFace:function(e,t){var n=s.create(e,t.tail(),t.head());return this.faces.push(n),n.getEdge(-1).setTwin(t.twin),n.getEdge(0)},addNewFaces:function(e,t){this.newFaces=[];for(var n=null,r=null,i=0;i<t.length;i++){var o=this.addAdjoiningFace(e,t[i]);null===n?n=o:o.next.setTwin(r),this.newFaces.push(o.face),r=o}return n.next.setTwin(r),this},addVertexToHull:function(e){var t=[];return this.unassigned.clear(),this.removeVertexFromFace(e,e.face),this.computeHorizon(e.point,null,e.face,t),this.addNewFaces(e,t),this.resolveUnassignedPoints(this.newFaces),this},cleanup:function(){return this.assigned.clear(),this.unassigned.clear(),this.newFaces=[],this},compute:function(){var e;for(this.computeInitialHull();void 0!==(e=this.nextVertexToAdd());)this.addVertexToHull(e);return this.reindexFaces(),this.cleanup(),this}}),Object.assign(s,{create:function(e,t,n){var r=new s,i=new u(e,r),o=new u(t,r),a=new u(n,r);return i.next=a.prev=o,o.next=i.prev=a,a.next=o.prev=i,r.edge=i,r.compute()}}),Object.assign(s.prototype,{getEdge:function(e){for(var t=this.edge;e>0;)t=t.next,e--;for(;e<0;)t=t.prev,e++;return t},compute:function(){void 0===i&&(i=new n.Triangle);var e=this.edge.tail(),t=this.edge.head(),r=this.edge.next.head();return i.set(e.point,t.point,r.point),i.getNormal(this.normal),i.getMidpoint(this.midpoint),this.area=i.getArea(),this.constant=this.normal.dot(this.midpoint),this},distanceToPoint:function(e){return this.normal.dot(e)-this.constant}}),Object.assign(u.prototype,{head:function(){return this.vertex},tail:function(){return this.prev?this.prev.vertex:null},length:function(){var e=this.head(),t=this.tail();return null!==t?t.point.distanceTo(e.point):-1},lengthSquared:function(){var e=this.head(),t=this.tail();return null!==t?t.point.distanceToSquared(e.point):-1},setTwin:function(e){return this.twin=e,e.twin=this,this}}),Object.assign(l.prototype,{first:function(){return this.head},last:function(){return this.tail},clear:function(){return this.head=this.tail=null,this},insertBefore:function(e,t){return t.prev=e.prev,t.next=e,null===t.prev?this.head=t:t.prev.next=t,e.prev=t,this},insertAfter:function(e,t){return t.prev=e,t.next=e.next,null===t.next?this.tail=t:t.next.prev=t,e.next=t,this},append:function(e){return null===this.head?this.head=e:this.tail.next=e,e.prev=this.tail,e.next=null,this.tail=e,this},appendChain:function(e){for(null===this.head?this.head=e:this.tail.next=e,e.prev=this.tail;null!==e.next;)e=e.next;return this.tail=e,this},remove:function(e){return null===e.prev?this.head=e.next:e.prev.next=e.next,null===e.next?this.tail=e.prev:e.next.prev=e.prev,this},removeSubList:function(e,t){return null===e.prev?this.head=t.next:e.prev.next=t.next,null===t.next?this.tail=e.prev:t.next.prev=e.prev,this},isEmpty:function(){return null===this.head}}),a}(),i=Math.PI/2,o={BOX:"Box",CYLINDER:"Cylinder",SPHERE:"Sphere",HULL:"ConvexPolyhedron",MESH:"Trimesh"},a=function(e,a){var c;if((a=a||{}).type===o.BOX)return u(e);if(a.type===o.CYLINDER)return function(e,r){var o=["x","y","z"],a=r.cylinderAxis||"y",s=o.splice(o.indexOf(a),1)&&o,u=(new n.Box3).setFromObject(e);if(!isFinite(u.min.lengthSq()))return null;var h=u.max[a]-u.min[a],l=.5*Math.max(u.max[s[0]]-u.min[s[0]],u.max[s[1]]-u.min[s[1]]),c=new t.Cylinder(l,l,h,12);return c._type=t.Shape.types.CYLINDER,c.radiusTop=l,c.radiusBottom=l,c.height=h,c.numSegments=12,c.orientation=new t.Quaternion,c.orientation.setFromEuler("y"===a?i:0,"z"===a?i:0,0,"XYZ").normalize(),c}(e,a);if(a.type===o.SPHERE)return function(e,n){if(n.sphereRadius)return new t.Sphere(n.sphereRadius);var r=h(e);return r?(r.computeBoundingSphere(),new t.Sphere(r.boundingSphere.radius)):null}(e,a);if(a.type===o.HULL)return function(e){var i=h(e);if(!i||!i.vertices.length)return null;for(var o=0;o<i.vertices.length;o++)i.vertices[o].x+=1e-4*(Math.random()-.5),i.vertices[o].y+=1e-4*(Math.random()-.5),i.vertices[o].z+=1e-4*(Math.random()-.5);var a=(new r).setFromObject(new n.Mesh(i)).faces,s=[],u=[];for(o=0;o<a.length;o++){var l=a[o],c=l.edge;do{var d=c.head().point;s.push(new t.Vec3(d.x,d.y,d.z)),u.push(new t.Vec3(l.normal.x,l.normal.y,l.normal.z)),c=c.next}while(c!==l.edge)}return new t.ConvexPolyhedron({vertices:s,normals:u})}(e);if(a.type===o.MESH)return(c=h(e))?function(e){var n=l(e);if(!n.length)return null;var r=Object.keys(n).map(Number);return new t.Trimesh(n,r)}(c):null;if(a.type)throw new Error('[CANNON.threeToCannon] Invalid type "%s".',a.type);if(!(c=h(e)))return null;switch(c.metadata?c.metadata.type:c.type){case"BoxGeometry":case"BoxBufferGeometry":return s(c);case"CylinderGeometry":case"CylinderBufferGeometry":return function(e){var r=e.metadata?e.metadata.parameters:e.parameters,i=new t.Cylinder(r.radiusTop,r.radiusBottom,r.height,r.radialSegments);return i._type=t.Shape.types.CYLINDER,i.radiusTop=r.radiusTop,i.radiusBottom=r.radiusBottom,i.height=r.height,i.numSegments=r.radialSegments,i.orientation=new t.Quaternion,i.orientation.setFromEuler(n.Math.degToRad(-90),0,0,"XYZ").normalize(),i}(c);case"PlaneGeometry":case"PlaneBufferGeometry":return function(e){e.computeBoundingBox();var n=e.boundingBox;return new t.Box(new t.Vec3((n.max.x-n.min.x)/2||.1,(n.max.y-n.min.y)/2||.1,(n.max.z-n.min.z)/2||.1))}(c);case"SphereGeometry":case"SphereBufferGeometry":return function(e){return new t.Sphere((e.metadata?e.metadata.parameters:e.parameters).radius)}(c);case"TubeGeometry":case"Geometry":case"BufferGeometry":return u(e);default:return console.warn('Unrecognized geometry: "%s". Using bounding box as shape.',c.type),s(c)}};function s(e){if(!l(e).length)return null;e.computeBoundingBox();var n=e.boundingBox;return new t.Box(new t.Vec3((n.max.x-n.min.x)/2,(n.max.y-n.min.y)/2,(n.max.z-n.min.z)/2))}function u(e){var r=e.clone();r.quaternion.set(0,0,0,1),r.updateMatrixWorld();var i=(new n.Box3).setFromObject(r);if(!isFinite(i.min.lengthSq()))return null;var o=new t.Box(new t.Vec3((i.max.x-i.min.x)/2,(i.max.y-i.min.y)/2,(i.max.z-i.min.z)/2)),a=i.translate(r.position.negate()).getCenter(new n.Vector3);return a.lengthSq()&&(o.offset=a),o}function h(e){var t,r=function(e){var t=[];return e.traverse(function(e){"Mesh"===e.type&&t.push(e)}),t}(e),i=new n.Geometry,o=new n.Geometry;if(0===r.length)return null;if(1===r.length){var a=new n.Vector3,s=new n.Quaternion,u=new n.Vector3;return r[0].geometry.isBufferGeometry?r[0].geometry.attributes.position&&r[0].geometry.attributes.position.itemSize>2&&i.fromBufferGeometry(r[0].geometry):i=r[0].geometry.clone(),i.metadata=r[0].geometry.metadata,r[0].updateMatrixWorld(),r[0].matrixWorld.decompose(a,s,u),i.scale(u.x,u.y,u.z)}for(;t=r.pop();)if(t.updateMatrixWorld(),t.geometry.isBufferGeometry){if(t.geometry.attributes.position&&t.geometry.attributes.position.itemSize>2){var h=new n.Geometry;h.fromBufferGeometry(t.geometry),o.merge(h,t.matrixWorld),h.dispose()}}else o.merge(t.geometry,t.matrixWorld);var l=new n.Matrix4;return l.scale(e.scale),o.applyMatrix(l),o}function l(e){return e.attributes||(e=(new n.BufferGeometry).fromGeometry(e)),(e.attributes.position||{}).array||[]}a.Type=o,e.threeToCannon=a});
//# sourceMappingURL=three-to-cannon.umd.js.map
