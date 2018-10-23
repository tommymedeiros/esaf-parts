// *
// * #menu-esaf
// *
if (!!Y.one(".notloggedin")) {
  Y.one("#menu-esaf .nav li:last-child").remove();
}

// *
// * .block_calendar_month
// *
if (!!Y.one(".block_calendar_month")) {
  Y.one(".calendartable").insert(Y.one(".calendar-controls"), "before");
}
// *
// * .block_login
// *
if (!!Y.one(".block_login")) {
  var blLogin = Y.one(".block_login"),
      labelLogin = blLogin.all("label"),
      inputLogin = blLogin.all("input[type='text'], input[type='password']"),
      iL = 0;
  // Define placeholders nos inputs a partir dos labels (que sao removidos em seguida)
  while (iL < inputLogin.size()) {
    inputLogin.item(iL).setAttribute("placeholder", labelLogin.item(iL).get("text"));
    labelLogin.item(iL).remove();
    iL++;
  }
  // Adiciona classes do Bootstrap para posicionamento dos campos
  blLogin.one(".content").addClass("row-fluid").one(".loginform").addClass("span8 offset2");
  // Reposiciona o link de recuperacao de senha
  var primeiroAcesso = blLogin.one(".footer > div:nth-child(1)"),
      recuperaSenha  = blLogin.one(".footer > div:nth-child(2)");
  primeiroAcesso.one("a").addClass("link-primeiro-acesso").unwrap();
  recuperaSenha.addClass("c1 recupera-senha").unwrap();
  blLogin.one(".rememberusername").insert(recuperaSenha, "before");
  // Cria a caixa 'PRIMEIRO ACESSO'
  var loginForm  = blLogin.one(".content .loginform");
  loginForm.insert("<div class='primeiro-acesso span8 offset2' />", "after");
  blLogin.one(".primeiro-acesso").append("<p>É o meu <a href='#!' class='tooltip-trigger'>primeiro acesso</a> aqui, não sei meu nome de usuário e senha!</p>");
  // Cria o tooltip 'PRIMEIRO ACESSO'
  // blLogin.one(".primeiro-acesso").insert("<div class='tooltip-primeiro-acesso fechado'><p>Olá!</p><p>Para o acesso completo aos cursos, você precisará <span class='link-wrapper'></span>.</p><p>Cada um dos cursos individuais pode também ter uma <strong>chave de inscrição de uso único</strong> que você não precisará até mais tarde.</p>", "after");
  blLogin.one(".primeiro-acesso").insert("<div class='tooltip-primeiro-acesso fechado'><p>Se você não possui cadastro nesta Escola Virtual da ESAF e deseja acesso aos cursos, <span class='link-wrapper'></span> e crie uma conta.</p>", "after");
  blLogin.one(".tooltip-primeiro-acesso .link-wrapper").append(blLogin.one(".link-primeiro-acesso"));
  blLogin.one(".tooltip-primeiro-acesso .link-wrapper a").set("text", "clique aqui");
  blLogin.one(".tooltip-primeiro-acesso").append("<span class='tooltip-fechar' />x</span>");
  blLogin.all(".tooltip-trigger, .tooltip-fechar").each(function() {
    this.on("click", function() {
      blLogin.one(".tooltip-primeiro-acesso").toggleClass("aberto");
    });
  });
  // blLogin.one(".tooltip-trigger").on("click", function() {
  //   blLogin.one(".tooltip-primeiro-acesso").toggleClass("aberto");
  // });
  // Y.all("*:not(.tooltip-trigger):not(.tooltip-primeiro-acesso):not(.tooltip-primeiro-acesso *)").on("click", function() {
  //   if (blLogin.one(".tooltip-primeiro-acesso").hasClass("fechado")) {
  //     blLogin.one(".tooltip-primeiro-acesso").removeClass("fechado");
  //   }
  // });
  // Clona a area de login, que surge ao clicar em 'acesso'
  var loginInfo  = Y.one("#page-header .logininfo");
  loginInfo.ancestor("ul").insert("<div class='clone-login clearfix' />", "after");
  Y.one(".clone-login").append(loginForm.get("parentNode").cloneNode(true));
  Y.one(".clone-login .tooltip-primeiro-acesso").addClass("span8 offset2");
  Y.one(".clone-login .tooltip-trigger").on("click", function() {
    Y.one(".clone-login .tooltip-primeiro-acesso").toggleClass("aberto");
  });
  Y.Node.create("<div class='row-fluid' />").append(Y.one(".clone-login .loginform").all(".username, .password, .btn")).appendTo(Y.one(".clone-login .loginform"));
  Y.Node.create("<div class='row-fluid' />").append(Y.one(".clone-login .loginform").all(".rememberusername, .recupera-senha")).appendTo(Y.one(".clone-login .loginform"));
  // Y.Node.create("<div class='row-fluid' />").append(Y.one(".clone-login .loginform").one(".rememberusername").one(".recupera-senha")).appendTo(Y.one(".clone-login .loginform"));
  Y.one(".clone-login .rememberusername").insert(Y.one(".clone-login .recupera-senha"), "after");
  Y.one(".clone-login").all(".username, .password, .rememberusername, .recupera-senha").addClass("span5");
  Y.one(".clone-login").one(".btn").addClass("span2");
  Y.one(".clone-login .loginform .row-fluid:first-child").insert(Y.one(".clone-login .primeiro-acesso"), "before");
  Y.one(".clone-login .primeiro-acesso").setAttribute("class", "primeiro-acesso row");
  /*acrescentado por godinho para o fechar do clone funcionar*/
  Y.one(".clone-login .tooltip-fechar").on("click", function() {
    Y.one(".clone-login .tooltip-primeiro-acesso").toggleClass("aberto")
  }),
  /*fim acrescentado por godinho para o fechar do clone funcionar*/
  loginInfo.one("a").on("click", function(e) {
    Y.one(".clone-login").toggleClass("aberto");
    e.preventDefault();
  });
  // Y.one(".clone-login .username").insert("<div class='acessos row' />", "before");
  // Y.one(".acessos.row").append(Y.one(".clone-login").all(".recupera-senha, .rememberusername"));
}

// *
// * .block_myprofile
// *
if (!!Y.one(".pagelayout-frontpage:not(.notloggedin)")) {
  Y.one(".block_myprofile .content").addClass("clearfix");
  Y.one(".block_myprofile .picture").addClass("pull-left")
   .insert("<p class='acesso-liberado'>Acesso liberado para</p>", "before").get("parentNode")
   .append("<div class='myprofileitem button'><a class='btn btn-mini sair' href='login/logout.php'>Sair</a></div>");
  Y.one(".block_myprofile .fullname").insert("<div class='myprofileitem profile' />", "after").next().append(Y.one(".block_navigation .content .depth_2:nth-child(3)").one(".depth_3 a").cloneNode(true));
  Y.one(".block_myprofile .profile a").set("text", "Atualizar Perfil");
   // .insert("<div class='dados' />", "after");
  // Y.one(".block_myprofile .dados").append(Y.one(".block_myprofile").all(".fullname, .city, .email"))
  //  .append("<div class='myprofileitem button'><a class='btn btn-mini sair' href='login/logout.php'>Sair</a></div>");
}

// *
// * .block_navigation
// *
// Remove o primeiro link do .block_navigation
if (!!Y.one("body:not(.notloggedin) .block_navigation")) {
  Y.one(".block_navigation a").remove();
}

// *
// * .block_search_forums
// *
if (!!Y.one(".block_search_forums")) {
  // Adiciona elementos e classes do Bootstrap para posicionamento dos campos
  Y.one(".block_search_forums .invisiblefieldset legend").insert("<div class='row-fluid' />", "before");
  Y.one(".block_search_forums").all("#searchform_search, #searchform_button").each(function(){
    // Y.one(".block_search_forums .row-fluid").append(this);
    this.siblings(".row-fluid").append(this);
  });
  Y.one(".block_search_forums .row-fluid input").wrap("<div class='span9' />");
  Y.one(".block_search_forums .row-fluid button").wrap("<div class='span3' />");
  // Define placeholder no input a partir do label
  Y.one(".block_search_forums #searchform_search").setAttribute("placeholder", Y.one(".block_search_forums label").get("text"));
  // Remove um <br /> que está sobrando no html
  Y.one(".block_search_forums .invisiblefieldset > br").remove();
}

// *
// * .block_settings .adminsearchform
// *
if (!!Y.one(".block_settings .adminsearchform")) {
  Y.one(".block_settings .adminsearchform > div").addClass("row-fluid").all("input").wrap("<div />");
  Y.one(".block_settings .row-fluid div:nth-of-type(1)").addClass("span9");
  Y.one(".block_settings .row-fluid div:nth-of-type(2)").addClass("span3");
}

// *
// * .block_valida_certificado
// *
if (!!Y.one(".block_valida_certificado")) {
  var blCert = Y.one(".block_valida_certificado"),
      labelCert = blCert.all("label"),
      inputCert = blCert.all("input[type='text']"),
      iC = 0;
  // Define placeholders nos inputs a partir dos labels (que sao removidos em seguida)
  while (iC < inputCert.size()) {
    inputCert.item(iC).setAttribute("placeholder", labelCert.item(iC).get("text"));
    labelCert.item(iC).remove();
    iC++;
  }
  // Adiciona classes do Bootstrap para definir a posicao e largura do bloco
  if (!!Y.one(".notloggedin")) {
    Y.one("#region-main [role='main']").addClass("row-fluid").append(blCert);
    blCert.addClass("span5");
  }
  // Adiciona classes do Bootstrap para posicionamento dos campos
  blCert.all("#validacertificado, #validacertificado_moodle1").addClass("row-fluid");
  blCert.all(".username").addClass("span9");
  blCert.all(".btn").addClass("span3 pull-right");
}

// *
// * Dock -> Experimentos que nao funcionaram (ou quase)
// *
// window.onload = function() {
//   if (!!Y.one("#dock")) {
//     Y.all(".buttons_container .dockeditem").each(function(node) {
//       node.on("mouseenter", function() {
//         Y.one("#dockeditempanel").setStyle("width", Y.one("#block-region-side-pre").getStyle("width"));
//       });
//     });
//   }
// }
// window.onload = function() {
//   if (!!Y.one("#dock")) {
//     Y.all(".buttons_;container .dockeditem").each(function(node, index) {
//       node.on("focus", function() {
//         Y.all("#dockeditempanel .block").item(index).delegate("focus", function() {
//           Y.all(".buttons_container .dockeditem").item(index).addClass("ativo");
//         });
//       });
//       // node.on("mouseover", function() {
//       //   Y.all("#dockeditempanel .block").item(index).on("mouseover", function() {
//       //     Y.all(".buttons_container .dockeditem").item(index).addClass("ativo");
//       //   });
//       // });
//     });
//   }
// }
// Ajusta onde comecam os botoes no dock, caso a barra da escola esteja presente
// if (!!Y.one("#dock") && !!Y.one(".escola")) {
//   // Y.one(".dockeditem_container").setStyle("margin-top", parseInt(Y.one(".dockeditem_container").getStyle("margin-top")) + 55 + "px"); // 55px da altura da barra da escola
//   // Y.one(".dockeditem_container").setStyle("margin-top", parseInt(Y.one(".escola").getStyle("height")) + parseInt(Y.one(".dockeditem_container").getStyle("margin-top")) + "px");
// }

// *
// * .pagelayout-frontpage
// *
// Listagem de cursos
if (!!Y.one(".pagelayout-frontpage:not(.notloggedin)")) {
  // Adiciona classes do Bootstrap
  Y.all("#frontpage-mycourses-list, #frontpage-enclosedcourses-list, #frontpage-availablecourses-list").each(function() {
    this.addClass("clearfix");
    this.one("h2").addClass("span10 offset1");
    // H2 com offsets diferentes
    // if (this === Y.one("#frontpage-mycourses-list")) {
    //   this.one("h2").addClass("span10 offset2");
    // } else {
    //   this.one("h2").addClass("span10 offset1");
    // }
    // H2 com a formatacao antiga
    // if (this === Y.one("#frontpage-availablecourses-list")) {
    //   this.one("h2").addClass("span10 offset1");
    // } else {
    //   this.one("h2").addClass("span10 offset2");
    // }
    // // Remove os links 'Todos os cursos'
    // this.one(".paging-morelink").remove();
    if (!!this.one(".nocourses")) {
      this.one(".nocourses").addClass("span12 text-center");
    }
  });
  Y.all("[class*='frontpage-course-list']").each(function() {
    this.addClass("span10 offset1");
    // this.set("innerHTML", "<div class='row-fluid'>" + this.get("innerHTML") + "</div>");
    this.all(".coursebox").each(function(){
      // this.addClass("span3 pull-left"); // ("span3");
      this.append(this.one(".info"));
      this.one(".content").insert(this.one(".coursename a").cloneNode(true), "before").previous("a").addClass("overlay");
      if (this.one(".coursename a").get("text").length > 48) {
        this.one(".coursename a").set("text", this.one(".coursename a").get("text").slice(0, 45) + "...");
      }
      if (!this.one(".summary")) {
        this.one(".content").append("<div class='summary' />");
      }
    });
  });
  // Agrupa e rerganiza a caixa de pesquisa e o link 'Todos os cursos'
  Y.one(".box.mdl-align").addClass("clearfix").setAttribute("id", "all-courses-search");
  // Define placeholder no input a partir do label (que eh removido em seguida)
  Y.one("#all-courses-search #shortsearchbox").setAttribute("placeholder", Y.one("#all-courses-search [for='shortsearchbox']").get("text").slice(0, -2));
  Y.one("#all-courses-search [for='shortsearchbox']").remove();
  // Remove um <br /> que está sobrando no html
  Y.one("#all-courses-search").next("br").remove();
  // Define o toggle que mostra e esconde os 'Cursos encerrados'
  // if (Y.one("#frontpage-enclosedcourses-list")) {
  //   Y.one("[href='#skipenclosedcourses']").insert("<a id='cursos-encerrados' href='#!' />", "after");
  //   Y.one("#cursos-encerrados").on("click", function() {
  //     this.toggleClass("fechado").next().toggleClass("fechado");
  //   });
  //   Y.one("#frontpage-enclosedcourses-list").addClass("fechado");
  // }
}

// *
// * .pagelayout-course && .pagelayout-incourse
// *
// Troca o separador do .breadcrumb
if (!!Y.one(".pagelayout-course") || !!Y.one(".pagelayout-incourse")) {
  Y.all(".breadcrumb .arrow.sep").set("text", "\273");
}
// Insere nome do aluno e do curso onde sao mencionados
if (!!Y.one(":contains(@@ALUNO@@)") || !!Y.one(":contains(@@NOME DO CURSO@@)")) {
  var dadosAluno  = Y.one(".logininfo a").get("text").split(" ")[0],
      dadosCurso  = Y.one("#page-header h1").get("text"),
      insereDados = function(elemento, marcacao, abreWrap, dados, fechaWrap) {
        Y.all(elemento + ":contains(" + marcacao + ")").each(function(){
          this.set("innerHTML", this.get("text").replace(marcacao, abreWrap + dados + fechaWrap));
        });
      }, marcacao, abreWrap, dados, fechaWrap;
  if (!!Y.one(":contains(@@ALUNO@@)")) {
    // Apenas esta linha precisa ser alterada/duplicada
    insereDados("h3", "@@ALUNO@@", "<span class='nome-aluno'>", dadosAluno, "</span>");
    insereDados("p", "@@ALUNO@@", "<span class='nome-aluno'>", dadosAluno, "</span>");
  }
  if (!!Y.one(":contains(@@NOME DO CURSO@@)")) {
    // Apenas esta linha precisa ser alterada/duplicada
    insereDados("p", "@@NOME DO CURSO@@", "<strong>", dadosCurso, "</strong>");
  }
}
// Formata o nome do topico, o dividindo em duas linhas
if (!!Y.one(".pagelayout-course")) {
  Y.all("h3.sectionname:contains( - )").each(function(){
    this.insert("<p class='numero-modulo'>" + this.get("text").split(" - ")[0] + "</p>", "before");
    this.addClass("titulo-modulo").set("text", this.get("text").split(" - ")[1]);
  });
}
// Permite uma outra formatacao ao topico na presenca do subtopico
if (!!Y.one(".topico + .subtopico")) {
  Y.one(".topico + .subtopico").previous().addClass("topico_menor");
}

// *
// * Extras
// *
// Esconde os .block_action em modo nao-desktop
if (!!Y.one("#block-region-side-pre") && !Y.one(".notloggedin")) {
  Y.all(".block .header .block_action").each(function() {
    this.addClass("visible-desktop");
  })
}
// Reposiciona o QR-code
if (!!Y.one(".notloggedin")) {
  blCert.insert(Y.one("#qr-code"), "before");
  // Remove um <br /> que está sobrando no html
  Y.one("#qr-code").previous("br").remove();
}
// Retira o padding superior do body em resolucoes nao-desktop
var larguraJanela,
    atualizaLarguraJanela = function() {
      larguraJanela = window.innerWidth;
    },
    zeraPaddingTop = function() {
      if (larguraJanela <= 979) {
        Y.one("body").setStyle("padding-top", 0);
      }
    };
window.onresize = function() {
  atualizaLarguraJanela();
  zeraPaddingTop();
};
window.onload = function() {
  atualizaLarguraJanela();
  zeraPaddingTop();

// *
// * fitText
// *
// Define os elementos afetados pelo fitText
  if (!!Y.one(".pagelayout-course #page-header[class*='cabecalho']") || !!Y.one(".pagelayout-incourse #page-header[class*='cabecalho']")) {
    Y.one("#page-header h1").wrap("<div class='fittext-container' />");
    window.fitText(document.querySelector("#page-header h1"));
  }
}