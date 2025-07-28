{
  description = "Desktop-style personal blog with React, TypeScript, and Vite";

  inputs = {
    # Node package version 24.4.1
    nixpkgs.url = "github:NixOS/nixpkgs/6027c30c8e9810896b92429f0092f624f7b1aace";

    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, flake-utils }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = nixpkgs.legacyPackages.${system};

        nodejs = pkgs.nodejs_24;

        buildInputs = with pkgs; [
          nodejs
          git
          curl

          nodePackages.typescript
          nodePackages.eslint
          nodePackages.prettier

          pre-commit
        ];

        runtimeDeps = [
        ];

      in {
        devShells.default = pkgs.mkShell {
          buildInputs = buildInputs ++ runtimeDeps;

          shellHook = ''
            echo "🏗️  Desktop Blog Development Environment"
            echo "📦 Node.js version: $(node --version)"
            echo "📦 npm version: $(npm --version)"
            echo ""
            echo "🚀 Quick commands:"
            echo "  npm install    - Install dependencies"
            echo "  npm run dev    - Start development server"
            echo "  npm run build  - Build for production"
            echo "  npm run preview - Preview production build"
            echo ""

            export PATH="$PWD/node_modules/.bin:$PATH"
            export NODE_ENV=development
          '';

          NODE_ENV = "development";
          NODE_PATH = "${nodejs}/lib/node_modules";
        };

        packages.default = pkgs.stdenv.mkDerivation {
          pname = "desktop-blog";
          version = "0.1.0";

          src = ./.;

          buildInputs = [ nodejs ];

          buildPhase = ''
            export HOME=$TMPDIR
            npm ci --offline --cache $TMPDIR/.npm
            npm run build
          '';

          installPhase = ''
            mkdir -p $out
            cp -r dist/* $out/
          '';

          meta = with pkgs.lib; {
            description = "Desktop-style personal blog built with React and TypeScript";
            homepage = "https://mikewright.me";
            license = licenses.mit;
            platforms = platforms.all;
          };
        };
      });
}
