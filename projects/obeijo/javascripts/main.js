(function() {
  var CATEGORY_BACK_ARM, CATEGORY_BACK_LEG, CATEGORY_BODY, CATEGORY_FRONT_ARM, CATEGORY_FRONT_LEG, TOTAL_LIFE_FOCE,
    _this = this;

  CATEGORY_BODY = 1;

  CATEGORY_FRONT_ARM = 2;

  CATEGORY_BACK_ARM = 4;

  CATEGORY_BACK_ARM = 8;

  CATEGORY_BACK_LEG = 16;

  CATEGORY_FRONT_LEG = 32;

  TOTAL_LIFE_FOCE = 20000;

  window.drawDebugWorld = false;

  window.debug = false;

  Event.observe(window, 'load', function() {
    var body, canvas, ctx, gravity, img, joint, jointData, k, mouseController, updateGround, world, worldHeight, worldWidth, _i, _len, _ref;
    $$('#soundBtn').invoke('observe', 'click', function(e) {
      var val;
      val = e.layerX;
      $$('#soundBtn .bg')[0].setStyle({
        'width': val + "px"
      });
      return $('bgAudio').volume = Math.max(val / 46 - 0.15, 0);
    });
    $$('#plusBtn').invoke('observe', 'click', function(e) {
      return Effect.toggle('about', 'appear', {
        duration: 0.3
      });
    });
    _this.bodyParts = $$(".bodyPart").reverse();
    _this.bodies = {};
    worldWidth = window.innerWidth;
    worldHeight = window.innerHeight;
    gravity = new b2Vec2(0, 0);
    world = new b2World(gravity, true);
    _this.groundBodies = [];
    updateGround = function() {
      var b, bodyDef, fd, _i, _len, _ref;
      _ref = _this.groundBodies;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        b = _ref[_i];
        world.DestroyBody(b);
      }
      fd = new b2FixtureDef();
      fd.shape = new b2PolygonShape();
      fd.shape.SetAsBox(worldWidth, 10);
      bodyDef = new b2BodyDef();
      bodyDef.type = b2Body.b2_staticBody;
      bodyDef.position.Set(0, 0);
      _this.groundBodies.push(world.CreateBody(bodyDef).CreateFixture(fd));
      bodyDef.position.Set(0, worldHeight);
      _this.groundBodies.push(world.CreateBody(bodyDef).CreateFixture(fd));
      fd = new b2FixtureDef();
      fd.shape = new b2PolygonShape();
      fd.shape.SetAsBox(10, worldHeight);
      bodyDef = new b2BodyDef();
      bodyDef.type = b2Body.b2_staticBody;
      bodyDef.position.Set(0, 0);
      _this.groundBodies.push(world.CreateBody(bodyDef).CreateFixture(fd));
      bodyDef.position.Set(worldWidth, 0);
      return _this.groundBodies.push(world.CreateBody(bodyDef).CreateFixture(fd));
    };
    updateGround();
    _this.bodyParts.each(function(part, index) {
      var bodyDef, fd;
      if (!part.readAttribute("data-body")) {
        return;
      }
      eval("bodyConfig = { " + (part.readAttribute("data-body")) + " }");
      part.bodyConfig = bodyConfig;
      bodyConfig.offsetX = bodyConfig.offset[0] + bodyConfig.width / 2;
      bodyConfig.offsetY = bodyConfig.offset[1] + bodyConfig.height / 2;
      fd = new b2FixtureDef();
      fd.density = 1;
      fd.friction = 1;
      fd.restitution = 0;
      fd.shape = new b2PolygonShape();
      fd.shape.SetAsBox(bodyConfig.width / 2, bodyConfig.height / 2);
      fd.filter.categoryBits = bodyConfig.category || 1;
      fd.filter.maskBits = bodyConfig.mask || 0;
      bodyDef = new b2BodyDef();
      bodyDef.type = b2Body.b2_dynamicBody;
      bodyDef.position.Set(worldWidth / 2 + bodyConfig.x, worldHeight / 2 + bodyConfig.y);
      bodyDef.userData = part;
      _this.bodies[part.id] = world.CreateBody(bodyDef);
      return _this.bodies[part.id].CreateFixture(fd);
    });
    _ref = _this.bodies;
    for (k in _ref) {
      body = _ref[k];
      img = body.GetUserData();
      if (!img.readAttribute("data-joint")) {
        continue;
      }
      eval("var joints = [ " + (img.readAttribute("data-joint")) + " ]");
      for (_i = 0, _len = joints.length; _i < _len; _i++) {
        jointData = joints[_i];
        if (!jointData.to) {
          continue;
        }
        joint = new b2RevoluteJointDef();
        joint.lowerAngle = (jointData.lAngle !== void 0 ? jointData.lAngle : -0.25) * Math.PI;
        joint.upperAngle = (jointData.uAngle !== void 0 ? jointData.uAngle : 0.25) * Math.PI;
        joint.enableLimit = true;
        joint.Initialize(body, jointData.to, new b2Vec2(worldWidth / 2 - jointData.x, worldHeight / 2 - jointData.y));
        world.CreateJoint(joint);
      }
    }
    canvas = $("canvas");
    if (canvas) {
      canvas.setStyle({
        display: 'block'
      });
      ctx = canvas.getContext('2d');
      canvas.width = worldWidth;
      canvas.height = worldHeight;
    }
    mouseController = new MouseController(world);
    _this.step = function(cnt) {
      var b, d;
      world.Step(1.0 / 60, 1, 1);
      ctx.clearRect(0, 0, worldWidth, worldHeight);
      mouseController.update();
      bodies.cabecas.ApplyImpulse(new b2Vec2(0, -TOTAL_LIFE_FOCE), bodies.cabecas.GetWorldCenter());
      bodies.ela_pe_frente.ApplyImpulse(new b2Vec2(0, TOTAL_LIFE_FOCE / 4), bodies.ela_pe_frente.GetWorldCenter());
      bodies.ela_pe_tras.ApplyImpulse(new b2Vec2(0, TOTAL_LIFE_FOCE / 4), bodies.ela_pe_tras.GetWorldCenter());
      bodies.ele_pe_frente.ApplyImpulse(new b2Vec2(0, TOTAL_LIFE_FOCE / 4), bodies.ele_pe_frente.GetWorldCenter());
      bodies.ele_pe_tras.ApplyImpulse(new b2Vec2(0, TOTAL_LIFE_FOCE / 4), bodies.ele_pe_tras.GetWorldCenter());
      b = world.m_bodyList;
      while (true) {
        if (!b) {
          break;
        }
        if (!(d = b.GetUserData())) {
          b = b.m_next;
          continue;
        }
        ctx.save();
        ctx.translate((b.GetPosition().x), (b.GetPosition().y));
        ctx.rotate(b.GetAngle());
        ctx.drawImage(d, -d.bodyConfig.offsetX, -d.bodyConfig.offsetY);
        ctx.restore();
        b = b.m_next;
      }
      if (window.drawDebugWorld) {
        drawWorld(world, ctx);
      }
      if (canvas.width !== window.innerWidth) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        updateGround();
      }
      return setTimeout('step(' + (cnt || 0) + ')', 10);
    };
    return step();
  });

}).call(this);
