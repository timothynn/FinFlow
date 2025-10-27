{
  description = "FinFlow - Smart Personal Finance Tracker";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, flake-utils }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = nixpkgs.legacyPackages.${system};
        
        nodejs = pkgs.nodejs_20;
        
        buildInputs = with pkgs; [
          nodejs
          nodePackages.npm
          nodePackages.pnpm
          git
        ];

        # Optional: For development with specific tools
        devInputs = with pkgs; [
          nodePackages.typescript
          nodePackages.typescript-language-server
          nodePackages.prettier
          nodePackages.eslint
        ];

      in
      {
        # Development shell
        devShells.default = pkgs.mkShell {
          buildInputs = buildInputs ++ devInputs;
          
          shellHook = ''
            echo "🚀 FinFlow Development Environment"
            echo "=================================="
            echo "Node.js version: $(node --version)"
            echo "npm version: $(npm --version)"
            echo ""
            echo "Available commands:"
            echo "  npm install    - Install dependencies"
            echo "  npm run dev    - Start development server"
            echo "  npm run build  - Build for production"
            echo "  npm start      - Start production server"
            echo ""
            echo "Happy coding! 💰"
            
            # Set up environment variables
            export NODE_ENV=development
            export NEXT_TELEMETRY_DISABLED=1
          '';
        };

        # Package definition
        packages.default = pkgs.buildNpmPackage {
          pname = "finflow";
          version = "1.0.0";
          
          src = ./.;
          
          npmDepsHash = "sha256-AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA="; # Update after first build
          
          buildPhase = ''
            npm run build
          '';
          
          installPhase = ''
            mkdir -p $out
            cp -r .next $out/
            cp -r public $out/
            cp package.json $out/
            cp next.config.js $out/
          '';
          
          meta = with pkgs.lib; {
            description = "Smart Personal Finance Tracker built with Next.js";
            homepage = "https://github.com/yourusername/finflow";
            license = licenses.mit;
            maintainers = [ ];
          };
        };

        # Apps
        apps.default = {
          type = "app";
          program = "${pkgs.writeShellScript "finflow-dev" ''
            cd $PWD
            ${nodejs}/bin/npm run dev
          ''}";
        };
      }
    );
}
